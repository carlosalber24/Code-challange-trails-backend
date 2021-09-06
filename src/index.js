const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer');
require('./config').mongodb;
require('dotenv').config();

const app = express()
const { Server: httpServer } = http
const server = httpServer(app)
const { NODE_ENV } = process.env
const SERVER_PORT = 3001
console.log(`Environment ${NODE_ENV}`)

class App {
  constructor() {
    this.config()
    this.setRoutes()
    this.startServer()
  }

  /**
   * Set up server configurations
   */
  config() {
    app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }))
    app.use(bodyParser.json())
    app.use(helmet())
    app.use(expressSanitizer())
    app.use(cors())
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Request-Method', '*')
      res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, DELETE'
      )
      res.header('Access-Control-Allow-Headers', 'Content-Type')

      next()
    })
  }

  /**
   * Set up routes configuration
   */
  setRoutes() {
    require('./Routes')(app)
  }

  /**
   * Start Server
   */
  startServer() {
    server.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`)
    })
  }
}

module.exports = new App()
