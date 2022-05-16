const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  // console.log(err)
  const customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Oops!! Something went wrong...'
  }
  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `The ID provided is not valid`
  }
  if (err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `${Object.keys(err.keyValue)} value is already in use`
  }
  return res.status(customError.statusCode).json({success: false, msg: customError.msg})
}

module.exports = errorHandler