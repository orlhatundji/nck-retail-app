/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { ObjectID } from 'mongodb'
import UserModel from '../user/model'


const {
  handleResponse, decodeToken, rolesAcceptable
} = require('./util')

class AuthCheck {
  static checkAuthStatus(req, res, next) {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      const user = decodeToken(res, bearerToken)
      req.user = user
      if (!user) {
        return handleResponse(res, 403, "Authentication failed, pls login again")
      }
      return next()
    }
    return handleResponse(res, 403, "Authentication failed, pls register or login")
  }

  static authorizeRole(req, res, next) {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      const user = decodeToken(res, bearerToken)
      if (user.role !== 'admin') return handleResponse(res, 403, 'You are not authorized')
    }
    next()
  }
}
export default AuthCheck
