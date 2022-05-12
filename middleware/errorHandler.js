const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  // console.log(err)
  const customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Oops!! Something went wrong...'
  }
  return res.status(customError.statusCode).json({success: false, msg: customError.msg})
}

module.exports = errorHandler