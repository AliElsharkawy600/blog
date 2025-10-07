const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("./routers/users");
const app = express();

// middleware to parse json body
app.use(express.json());
app.use(cors());

// routes
app.use("/users", usersRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect("mongodb://localhost:27017/zag-node-db")
    .then(() => console.log("✅✅ Connected to MongoDB"))
    .catch((err) => console.error("❌❌ Error connecting to MongoDB", err));
});
