import express from 'express'
import user from './user/endpoint'
import item from './item/endpoint'
import cart from './cart/endpoint'


const app = express()


app.use('/api/v1/user', user)
app.use('/api/v1/item', item)
app.use('/api/v1/cart', cart)

// app.use('/', otherRoutes)

export default app
