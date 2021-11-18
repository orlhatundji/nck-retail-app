import express from 'express'
import validateBody from './validator'
import { validate } from '../helpers/util'
import ItemServices from './services'
import AuthCheck from '../helpers/middleware'

const router = express.Router()
router.route('/')
  .post(
    AuthCheck.checkAuthStatus,
    AuthCheck.authorizeRole,
    validateBody.create,
    validate,
    ItemServices.create
  )
  .get(
    ItemServices.getInventory
)

router.route('/:itemId')
  .get(
    validateBody.getItem,
    validate,
    ItemServices.getInventoryItem
  )
  .put(
    AuthCheck.checkAuthStatus,
    AuthCheck.authorizeRole,
    validateBody.getItem,
    validate,
    ItemServices.updateInventoryItem
  )
  .delete(
    AuthCheck.checkAuthStatus,
    AuthCheck.authorizeRole,
    validateBody.getItem,
    validate,
    ItemServices.deleteInventoryItem
  )

export default router