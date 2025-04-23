const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swaggerConfig')

const userRoutes = require("./routes/user.routes");

const app = express();

app.use("/api/docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/user", userRoutes);

module.exports = app;
