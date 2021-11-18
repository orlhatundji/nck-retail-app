import { filterNullProp, handleResponse } from '../helpers/util'
import CartModel from './model'

class CartServices {
    static async updateCart(req, res) {
        await CartModel.findOneAndUpdate(
            { owner: req.user.email},
            {$addToSet: { items: req.body.itemId }},
            {new: true, upsert: true },
            
            async(err, data) => {
            if(err) {
                return handleResponse(res, 400, 'Unable to get add item to cart')
            }

            const cart = data.toObject()
            delete cart._id
            delete cart.__v
            return handleResponse(res, 200, 'Inventory item updated successfully', cart)
        }).clone()
    }
}

export default CartServices