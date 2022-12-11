const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const { sendToken } = require('../utils/jwtToken');
const crypto = require('crypto');

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, company, email, password } = req.body;

  const user = await User.create({
    name,
    company,
    email,
    password,
  });
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  // checking if user has given password and email both

  if (!email) {
    return next(new ErrorHandler('Please Enter Email ', 400));
  }
  if (!password) {
    return next(new ErrorHandler('Please Enter Password ', 400));
  }

  //just selecting the user with email provided and also selecting the password field so that we can compare later
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
