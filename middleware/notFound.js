const { StatusCodes } = require('http-status-codes')

const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({success: false, msg: 'Resource not found...'})
}

module.exports = notFoundMiddleware