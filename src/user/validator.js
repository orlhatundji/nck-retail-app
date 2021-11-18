/* eslint-disable no-useless-escape */
import { check } from 'express-validator'
import UserModel from './model'

const validateBody = {
  signup: [
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('name must not be empty')
      .trim()
      .isLength({ max: 256 })
      .withMessage('must not be longer than 256'),
    check('lastName')
      .not()
      .isEmpty()
      .withMessage('name must not be empty')
      .trim()
      .isLength({ max: 256 })
      .withMessage('must not be longer than 256'),
    check('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('email must not be empty')
      .if(check('email').exists({ checkFalsy: true }))
      .isEmail()
      .withMessage('email must be a valid email')
      .if(check('email').exists({ checkFalsy: true }))
      .isLength({ max: 256 })
      .withMessage('email must not be longer than 256 characters')
      .custom(async (email) => {
        const existingUser = await UserModel.findOne({
          email
        })
        if (existingUser) {
          throw new Error('Email already in use')
        }
      }),
    check('role')
      .not()
      .isEmpty()
      .withMessage('role must not be empty')
      .trim()
      .isIn(['admin', 'user'])
      .withMessage('role is not acceptable'),
    check('password')
      .isString()
      .not()
      .isEmpty()
      .trim()
      .withMessage('password cannot be empty')
      .isLength({ min: 8, max: 256 })
      .withMessage('password must not be less than 8 characters'),
    check('confirmPassword')
      .isString()
      .not()
      .isEmpty()
      .trim()
      .withMessage('password cannot be empty')
      .isLength({ min: 8, max: 256 })
      .withMessage('password must not be less than 8 characters'),
  ],
  login: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('email must not be empty')
      .trim()
      .isLength({ max: 256 })
      .withMessage('must not be longer than 256'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('password must not be empty')
      .trim()
      .isLength({ max: 256 })
      .withMessage('password cannot not be longer than 256'),
  ]
}

export default validateBody
