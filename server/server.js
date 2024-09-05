const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authPath = require("./routes/Auth");
const userPath = require("./routes/user");

const cors = require("cors");
server.use(cors());
dotenv.config();

// Body parsing middleware
server.use(express.json());
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MY_ENTRY_POINT)
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT}\nConnected to dataBase...`
      );
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error.message);
  });

// Routes
server.use("/auth", authPath);
server.use("/api/user", userPath);
