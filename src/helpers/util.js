import { validationResult } from 'express-validator'
import dot from 'dotenv'
import CryptoJS from 'crypto-js'

dot.config()

export const handleResponse = (res, statusCode, message, data, token) => res.status(statusCode).json({
  message,
  data,
  token
})

export const generateToken = payload => CryptoJS.AES.encrypt(JSON.stringify(payload), process.env.TOKEN_PASSWORD).toString()

export const decodeToken = (res, token) => {
  const bytes = CryptoJS.AES.decrypt(token, process.env.TOKEN_PASSWORD)  
  if (!bytes) return handleResponse(res, 403, "Unable to verify user")
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}


export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

export const rolesAcceptable = (url, roles) => {
  switch (url) {
    case url.includes('/admin'):
      return role === 'admin'
    case (url = '/user'):
      return roles === 'user'
    default:
      return '/'
  }
}

export const filterNullProp = (obj) => {
  if (!obj || !typeof obj === 'object') return {}
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj
}