const jwt = require('jsonwebtoken')
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, PRIVATE_KEY)
  },

  verifyToken(token) {
    return jwt.verify(token, PRIVATE_KEY)
  }
}
