const sendResponse = require('../utils/sendResponse')

/**
 * 404 handler for unmatched routes.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

/**
 * Centralized Express error handler returning unified JSON responses.
 */
const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500)
  let message = err.message || 'Internal Server Error'

  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid identifier format for ${err.path}`
  } else if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ')
  } else if (err.code === 11000) {
    statusCode = 409
    const duplicateField = Object.keys(err.keyValue || {})[0] || 'field'
    message = `Duplicate value for ${duplicateField}`
  }

  return sendResponse(res, statusCode, false, null, message)
}

module.exports = { notFound, errorHandler }

