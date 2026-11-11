const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('../middleware/asyncHandler')
const sendResponse = require('../utils/sendResponse')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })

const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  shippingAddress: user.shippingAddress,
})

/**
 * POST /api/auth/register
 */
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, shippingAddress } = req.body

    if (!name || !email || !password) {
      return sendResponse(res, 400, false, null, 'Name, email, and password are required')
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return sendResponse(res, 409, false, null, 'An account with this email already exists')
    }

    const user = await User.create({
      name,
      email,
      password,
      shippingAddress: shippingAddress || {},
    })

    const token = generateToken(user._id)
    setAuthCookie(res, token)

    return sendResponse(res, 201, true, { user: sanitizeUser(user) }, 'Registration successful')
  } catch (error) {
    return next(error)
  }
})

/**
 * POST /api/auth/login
 */
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return sendResponse(res, 400, false, null, 'Email and password are required')
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user || !(await user.matchPassword(password))) {
      return sendResponse(res, 401, false, null, 'Invalid email or password')
    }

    const token = generateToken(user._id)
    setAuthCookie(res, token)

    return sendResponse(res, 200, true, { user: sanitizeUser(user) }, 'Login successful')
  } catch (error) {
    return next(error)
  }
})

/**
 * POST /api/auth/logout
 */
const logoutUser = asyncHandler(async (_req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    return sendResponse(res, 200, true, null, 'Logged out successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * GET /api/auth/me
 */
const getMe = asyncHandler(async (req, res, next) => {
  try {
    return sendResponse(res, 200, true, { user: sanitizeUser(req.user) }, 'Authenticated user retrieved')
  } catch (error) {
    return next(error)
  }
})

module.exports = { registerUser, loginUser, logoutUser, getMe }

