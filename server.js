const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
