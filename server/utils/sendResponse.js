/**
 * Send a unified API JSON response: { success, data, message }.
 */
const sendResponse = (res, statusCode, success, data, message) => {
  return res.status(statusCode).json({
    success,
    data,
    message,
  })
}

module.exports = sendResponse

