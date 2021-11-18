import { filterNullProp, handleResponse } from '../helpers/util'
import ItemModel from './model'

class ItemServices {
    static async create(req, res) {
        const { title, description, price, category } = req.body
        
        const item = { title, description, price, category }
        await ItemModel.create(item, async(err, data) => {
            if (err) {
                console.log('Error', err.message)
                return handleResponse(res, 400, 'Unable to create inventory item')
            }
            const userDetail = data.toObject()
            delete userDetail._id
            delete userDetail.__v

            return handleResponse(res, 200, 'Inventory item created successfully', userDetail)
        })
    }

    static async getInventory(req, res) {
            await ItemModel.find({}, async(err, data) => {
            if (err) {
                return handleResponse(res, 400, 'Unable to get inventory data')
            }
            return handleResponse(res, 201, 'Inventory item fetched successfully', data)
        }).clone()
    }

    static async getInventoryItem(req, res) {
        await ItemModel.findOne({ itemId: req.params.itemId}, { _id:0, __v:0 }, async(err, data) => {
            if(err) {
                return handleResponse(res, 400, 'Unable to get inventory item')
            }
            if (!data) {
                return handleResponse(res, 404, 'Item not found')
            }

            return handleResponse(res, 200, 'Inventory item found successfully', data)
        }).clone()
    }

    static async updateInventoryItem(req, res) {
        const { title, description, price, category } = req.body
        let update = { title, description, price, category }
        update = filterNullProp(update)

        await ItemModel.findOneAndUpdate(
            { itemId: req.params.itemId},
            {
                $set: {
                  ...update
                }
            },
            { new: true },
            async(err, data) => {
            if(err) {
                return handleResponse(res, 400, 'Unable to get inventory data')
            }
            const item = data.toObject()
            delete item._id
            delete item.__v
            return handleResponse(res, 200, 'Inventory item updated successfully', item)
        }).clone()
    }

    static async deleteInventoryItem(req, res) {
        await ItemModel.findOneAndDelete({ itemId: req.params.itemId}, async(err) => {
            if(err) {
                return handleResponse(res, 400, 'Unable to delete inventory item')
            }

            return handleResponse(res, 200, 'Inventory item deleted successfully',)
        }).clone()
    }
}

export default ItemServices