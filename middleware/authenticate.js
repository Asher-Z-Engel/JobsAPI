const { AuthError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)
  next()
}

module.exports = authenticate