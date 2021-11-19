const itemDoc = {
    '/item/create': {
        post: {
            tags: ['Inventory Item'],
            summary: 'To create new inventory item',
            description: 'To create new inventory item',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    require: true,
                    description: 'Payload containing new item information',
                    schema: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string',
                                example: '5000MAh Power Bank'
                            },
                            description: {
                                type: 'string',
                                example: 'Power storage device for mobile phones'
                            },
                            price: {
                                type: 'number',
                                example: '5000'
                            },
                            category: {
                                type: 'string',
                                description: 'Must be among the options ',
                                example: 'hardware || software || electronics || others'
                            }
                        }
                    }
                }
            ],
            responses: {
                201: {
                    description: 'Inventory item created successfully',
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
                    description: 'unable to create new inventory item'
                }
            },
            security: [
                {
                  Bearer: []
                }
              ]
        }
    },
    '/item': {
        get: {
            tags: ['Inventory Item'],
            summary: 'To get all inventory items',
            description: 'To get all inventory items',
            parameters: [
                {
                  name: 'category',
                  in: 'path',
                  required: false,
                  type: 'string',
                  description: 'The item category for filter'
                }
            ],
            responses: {
                200: {
                    description: 'Inventory items found successfully',
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
                    description: 'unable to fetch inventory items'
                },
                404: {
                    description: 'No item found'
                }
            }
        }
    },
    '/item/{itemId}': {
        get: {
            tags: ['Inventory Item'],
            summary: 'To get an inventory item',
            description: 'To get an inventory item',
            parameters: [
                {
                  name: 'itemId',
                  in: 'path',
                  required: true,
                  type: 'string',
                  description: 'The itemId of the inventory item'
                }
            ],
            responses: {
                200: {
                    description: 'Inventory item found successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                500: {
                    description: 'Something went wrong, try again later'
                },
                404: {
                    description: 'No item found with that ID'
                }
            }
        },
        put: {
            tags: ['Inventory Item'],
            summary: 'To update an inventory item',
            description: 'To update an inventory item',
            parameters: [
                {
                  name: 'itemId',
                  in: 'path',
                  required: true,
                  type: 'string',
                  description: 'The itemId of the inventory item'
                },
                {
                    name: 'body',
                    in: 'body',
                    require: true,
                    description: 'Payload containing updated information for item',
                    schema: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string',
                                example: '4500MAh Power Bank'
                            },
                            description: {
                                type: 'string',
                                example: 'Power storage device for mobile phones aand tablets'
                            },
                            price: {
                                type: 'number',
                                example: '15000'
                            },
                            category: {
                                type: 'string',
                                description: 'Must be among the options ',
                                example: 'electronics'
                            }
                        }
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Inventory item updated successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                500: {
                    description: 'Something went wrong, try again later'
                },
                404: {
                    description: 'No item found with that ID'
                }
            }
        },
        delete: {
            tags: ['Inventory Item'],
            summary: 'To delete an inventory item',
            description: 'To delete an inventory item',
            parameters: [
                {
                  name: 'itemId',
                  in: 'path',
                  required: true,
                  type: 'string',
                  description: 'The itemId of the inventory item'
                }
            ],
            responses: {
                204: {
                    description: 'Inventory item delete successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                500: {
                    description: 'Something went wrong, try again later'
                },
                404: {
                    description: 'No item found with that ID'
                }
            }
        },
    }
}

export default itemDoc