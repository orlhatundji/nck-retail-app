import dotenv from 'dotenv'
import userDoc from './user/doc'
import itemDoc from './item/doc'
import cartDoc from './cart/doc'

dotenv.config()

const doc = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Inventory Management',
    description: 'An Inventory Management Application'
  },
  host: process.env.BACKEND_URL || 'localhost:8080',
  basePath: '/api/v1',
  tags: [
    {
      name: 'User',
      description: 'API for users in the system'
    }
  ],
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    ...userDoc,
    ...itemDoc,
    ...cartDoc,
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      description:
        `Add token for authorization using the format Bearer (token)e.g.
        'Bearer eetelteouou1223424nkdnkdgndkg'`,
      name: 'authorization'
    }
  }
}

export default doc
