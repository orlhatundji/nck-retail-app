import { check, param } from 'express-validator'
import ItemModel from '../item/model'

const validateBody = {
  addItem: [
    check('itemId')
      .not()
      .isEmpty()
      .withMessage('itemId must not be empty')
      .trim()
      .isNumeric()
      .withMessage('ItemId must be numeric')
      .custom(async (itemId) => {
        const item = await ItemModel.findOne({
          itemId
        })
        if (!item) {
          throw new Error('Cannot add item to cart; invalid item ID')
        }
      }),
  ]
}

export default validateBody
