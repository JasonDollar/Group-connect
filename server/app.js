const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000
const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL
const handle = app.getRequestHandler()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('DB connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})

app.prepare().then(() => {
  const server = express()
  server.use(express.json())
  server.use(cookieParser())

  /* give all Next.js's requests to Next.js server */
  server.get('/_next/*', (req, res) => {
    handle(req, res)
  })
  
  server.get('/static/*', (req, res) => {
    handle(req, res)
  })
  /* Error handling from async / await functions */
  server.use((err, req, res, next) => {
    const { status = 500, message } = err
    res.status(status).json(message)
  })
  server.use((req, res, next) => {
    // console.log(req.cookies)
    next()
  })
  /* apply routes from the "routes" folder */
  server.use('/', routes)

  /* default route
    - allows Next to handle all other routes
    - includes the numerous `/_next/...` routes which must    be exposedfor the next app to work correctly
    - includes 404'ing on unknown routes */
  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`Server listening on ${ROOT_URL}`)
  })
})