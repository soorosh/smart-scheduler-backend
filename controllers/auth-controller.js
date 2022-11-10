const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index.js");
const User = require("../models/User.js");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  /* This is checking if the user has provided all the required values. If not, it will throw an error. */
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //   const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

// const updateUser = async (req, res) => {
//   const { email, name, lastName, location } = req.body;
//   if (!email || !name || !lastName || !location) {
//     throw new BadRequestError("Please provide all values");
//   }
//   const user = await User.findOne({ _id: req.user.userId });

//   user.email = email;
//   user.name = name;
//   user.lastName = lastName;
//   user.location = location;

//   await user.save();

//   const token = user.createJWT();

//   res.status(StatusCodes.OK).json({ user, token, location: user.location });
// };

module.exports = {
  register,
  login,
  // updateUser
};
