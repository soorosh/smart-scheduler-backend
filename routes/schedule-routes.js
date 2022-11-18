const express = require("express");
// const rateLimiter = require("express-rate-limit");
const router = express.Router();

const {
    getSchedule,
    automateSchedule
} = require("../controllers/schedule-controller.js");
// import authenticateUser from "../middleware/auth.js";
router.route("/").get(
    // apiLimiter,
    getSchedule
);
router.route("/automate").post(
    // apiLimiter,
    automateSchedule
);

module.exports = router;