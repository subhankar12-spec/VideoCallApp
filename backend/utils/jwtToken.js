const ErrorHander = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.getTokenDetails = async (token) => {
  if (!token) {
    return next(new ErrorHander('Please Login to access this resource', 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedData.id);
  return user;
};
// Create Token and saving in cookie

exports.sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};
