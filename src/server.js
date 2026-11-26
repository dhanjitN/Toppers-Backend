require("dotenv").config();

const app = require("./app");
const connectToDatabase = require("./config/database");

const port = Number(process.env.PORT) || 3000;

connectToDatabase(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Toppers API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exitCode = 1;
  });
