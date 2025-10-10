const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv')
const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");

const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();



// middleware to parse json body
app.use(express.json());
app.use(cors());
app.use(rateLimiter)

dotenv.config();

// routes
app.use("/users", usersRouter);
app.use('/posts',postsRouter)



// global Error Handeller 
app.use(errorHandler);


const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log("➡️➡️➡️➡️",MONGO_URI, PORT)
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅✅ Connected to MongoDB"))
    .catch((err) => console.error("❌❌ Error connecting to MongoDB", err));
});
