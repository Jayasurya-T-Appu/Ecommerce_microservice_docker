const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swaggerConfig')
const helmet = require("helmet");

const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/api/docs/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/product/', productRoutes)
app.use('/api/category/', categoryRoutes)

module.exports = app;