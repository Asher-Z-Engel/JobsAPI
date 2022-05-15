const { AuthError } = require('../errors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('You are not authorized to access this resource')
  }
  const token = authHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  const { userId, name } = decodedToken
  try {
    await User.findById(userId)
    req.user = {userId, name}
    next()
  } catch (error) {
    throw new AuthError('You are not authorized to access this resource')
  }
}

module.exports = authenticate