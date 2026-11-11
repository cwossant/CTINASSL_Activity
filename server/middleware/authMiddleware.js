const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('./asyncHandler')
const sendResponse = require('../utils/sendResponse')

const extractToken = (req) => {
  if (req.cookies && req.cookies.token) return req.cookies.token
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1]
  }
  return null
}

/**
 * Require a valid JWT in HTTP-only cookie or Authorization header.
 */
const protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req)
  if (!token) {
    return sendResponse(res, 401, false, null, 'Not authorized, no token provided')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return sendResponse(res, 401, false, null, 'Not authorized, user no longer exists')
    }
    req.user = user
    return next()
  } catch (_error) {
    return sendResponse(res, 401, false, null, 'Not authorized, invalid or expired token')
  }
})

/**
 * Attach req.user if authenticated, otherwise allow anonymous/guest request.
 */
const optionalAuth = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req)
  if (!token) return next()

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
  } catch (_error) {
    req.user = null
  }
  return next()
})

/**
 * Restrict route access to admin users.
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return sendResponse(res, 403, false, null, 'Admin access required')
  }
  return next()
}

module.exports = { protect, optionalAuth, adminOnly }

