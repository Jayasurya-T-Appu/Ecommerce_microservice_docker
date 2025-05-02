const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 3001;

connectDB()

app.listen(PORT, () => {
  console.log(`🚀 Order Service running on port ${PORT}`);
})