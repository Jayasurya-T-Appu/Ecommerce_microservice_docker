// const connectDB = require("./src/config/db");
const app = require("./app");

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
// connectDB();

app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
