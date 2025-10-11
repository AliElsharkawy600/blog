const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");
const dotenv = require('dotenv')

const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");

const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const CustomError = require("./utils/customError");

const app = express();
const V1_PREFIX = "/api/v1";



// middleware to parse json body
app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use(helmet());
app.use(xss());
app.use(hpp());

dotenv.config();

// routes
app.use(`${V1_PREFIX}/users`, usersRouter);
app.use(`${V1_PREFIX}/posts`,postsRouter)

// not found route
app.use((req, res) => {
  throw new CustomError("Route not found", 404);
});


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
