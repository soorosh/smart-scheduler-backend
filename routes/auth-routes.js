const express = require("express");
// const rateLimiter = require("express-rate-limit");
const router = express.Router();

// const apiLimiter = rateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10,
//   message: "Too many requests from this IP, please try again after 15 minutes",
// });

const {
  register,
  login,
  // updateUser
} = require("../controllers/auth-controller.js");
// import authenticateUser from "../middleware/auth.js";
router.route("/register").post(
  // apiLimiter,
  register
);
router.route("/login").post(
  // apiLimiter,
  login
);
// router.route("/updateUser").patch(authenticateUser, updateUser);

module.exports = router;
