const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  signUp,
  logIn,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
const { loginSchema, signUpSchema } = require("../utils/schemas/users");
const restrictTo = require("../middlewares/restrictTo");
const validator = require("../middlewares/validator");
const checkOwnership = require("./../middlewares/ownership");

const router = Router();

// auth routes
router.post("/signup", validator(signUpSchema), signUp);

router.post("/login", validator(loginSchema), logIn);

// /users
// get all users
router.get("/", auth, restrictTo("admin"), getAllUsers);

// get user by id
router.get("/:id", auth, restrictTo("admin"), getUserById);

// update User
router.patch("/:id", auth, checkOwnership, updateUser);

// delete user
router.delete("/:id", auth, restrictTo("admin"), deleteUser);

module.exports = router;
