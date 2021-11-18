import { check, param } from 'express-validator'

const validateBody = {
  create: [
    check('title')
      .not()
      .isEmpty()
      .withMessage('title must not be empty')
      .trim()
      .isLength({ max: 50 })
      .withMessage('title cannot be longer than 256'),
    check('description')
      .not()
      .isEmpty()
      .withMessage('name must not be empty')
      .trim()
      .isLength({ max: 256 })
      .withMessage('must not be longer than 256'),
    check('price')
      .not()
      .isEmpty()
      .withMessage('price must not be empty')
      .trim()
      .isNumeric()
      .withMessage('Price must be a numeric value'),
    check('category')
      .not()
      .isEmpty()
      .withMessage('category cannot not be empty')
      .trim()
      .isIn(['hardware', 'software', 'electronics'])
      .withMessage('Category is not acceptable')
  ],
  getItem: [
    param('itemId').exists()
  ]
}

export default validateBody
