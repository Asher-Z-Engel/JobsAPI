const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {
  res.status(StatusCodes.OK).json({success: true, msg: 'Logged in'})
}

const register = async (req, res) => {
  res.status(StatusCodes.ACCEPTED).json({success: true, msg: 'Registered user'})
}

module.exports = {
  login, register
}