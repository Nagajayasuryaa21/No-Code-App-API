require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const configRoutes = require("./routes/configRoute");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);

const port = process.env.PORT;
if (port) {
  app.listen(port, console.log(`Listening on port ${port}...`));
}

module.exports=app;