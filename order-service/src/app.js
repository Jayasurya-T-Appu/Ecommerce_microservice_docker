const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/order", orderRoutes);
module.exports = app;