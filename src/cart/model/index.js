import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  owner: {
      type: String,
      required: true
  },
  items: {
      type: Array,
      required: true,
      default: []
  }
})

const CartModel = model('Cart', cartSchema)

export default CartModel
