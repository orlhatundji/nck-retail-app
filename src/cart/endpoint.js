import express from 'express'
import validateBody from './validator'
import { validate } from '../helpers/util'
import CartServices from './services'
import AuthCheck from '../helpers/middleware'

const router = express.Router()
router.route('/')
  .put(
    AuthCheck.checkAuthStatus,
    validateBody.addItem,
    validate,
    CartServices.updateCart
  )

export default router