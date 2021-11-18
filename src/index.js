import express from 'express'
import http from 'http'
import logger from 'morgan'
import swaggerUiExpress from 'swagger-ui-express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import routes from './route'
import swaggerDoc from './APIDoc'
import { handleResponse } from './helpers/util'

dotenv.config()

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err)
})

db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Database connection established')
})

const app = express()

//  Log request to console
app.use(logger('dev'))

// TO parse request body
app.use(express.json());
app.use(express.urlencoded())

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDoc))
// app.use('/api/v1/public', express.static('public'))

const port = parseInt(process.env.PORT, 10) || 8080
app.set('port', port)

// import routes into application
app.use(routes)

// cors config
// app.use(cors({
//   origin: [process.env.CLIENT_PRODUCTION_URL, process.env.BACKEND_URL, 'http://localhost:3000', 'http://localhost:8080', '*'],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }))

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  console.log(error)
  handleResponse(res, 400, error.message, error)
})

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const server = (http.createServer(app))

server.listen(port, () => console.log('Server is running on port ', port))

export default server