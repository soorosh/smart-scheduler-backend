const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../app/errors/index.js");
const User = require("../models/User");

const checkRequiredValues = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  next();
};

const checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.body;

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  next();
};

const verifySignUp = {
  checkRequiredValues,
  checkDuplicateEmail,
};

module.exports = verifySignUp;
