const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swaggerConfig')


const app = express()
app.use(express.json())
app.use(cors())

module.exports = app;