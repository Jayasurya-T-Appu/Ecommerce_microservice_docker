const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/health-check",(req, res)=>{
    console.log("Health check");
    res.status(200).send({"message": "Server is up and running"});
})
// app.use("/api/users", userRoutes);

module.exports = app;
