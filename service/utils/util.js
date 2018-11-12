
const secret = require('../config/secret').secret
const jwt = require('jsonwebtoken')

module.exports = {
  getUserId (ctx) {
    const credentials = ctx.header.authorization.split(' ')[1]
    return jwt.verify(credentials, secret).userId
  }
}
