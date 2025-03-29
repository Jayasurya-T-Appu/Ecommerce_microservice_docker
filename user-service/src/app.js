const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swaggerConfig')

const userRoutes = require("./routes/user.routes");

const app = express();

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/health-check",(req, res)=>{
    console.log("Health check");
    res.status(200).send({"message": "Server is up and running"});
})
app.use("/api/user", userRoutes);

module.exports = app;
