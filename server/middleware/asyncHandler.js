/**
 * Wrap async route controllers to forward rejected promises to Express error middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler

