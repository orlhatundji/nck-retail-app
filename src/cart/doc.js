const cartDoc = {
    '/cart': {
        put: {
            tags: ['Cart'],
            summary: 'To update user cart',
            description: 'Add item to cart by supplying the itemID',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    require: true,
                    description: 'Payload containing the inventory item to add to cart',
                    schema: {
                        type: 'object',
                        properties: {
                            itemId: {
                                type: 'string',
                                example: '5'
                            }
                        }
                    }
                }
            ],
            responses: {
                201: {
                    description: 'Item added to cart successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                400: {
                    description: 'Unable to add item to cart'
                }
            },
            security: [
                {
                  Bearer: []
                }
              ]
        }
    }
}

export default cartDoc