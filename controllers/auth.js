const User = require('../models/User')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Email and password are required')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new BadRequestError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.checkPassword(password)
  if (!isPasswordCorrect) {
    throw new BadRequestError('Invalid Credentials')
  }
  res.status(StatusCodes.ACCEPTED).json({success: true, name: user.name, token: user.createToken()})
}

const register = async (req, res) => {
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({success: true, name: user.name, token: user.createToken()})
}

module.exports = {
  login, register
}