import express from 'express'
import validateBody from './validator'
import { validate } from '../helpers/util'
import UserServices from './services'
import AuthCheck from '../helpers/middleware'

const router = express.Router()

router.post(
  '/signup',
  validateBody.signup,
  validate,
  UserServices.signup
)

router.post(
  '/login',
  validateBody.login,
  validate,
  UserServices.login
)

export default router