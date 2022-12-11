const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const Meet = require('../models/meet');
const User = require('../models/userModel');

//get meet details with member name from User Modal
router.route('/').get(ensureAuthenticated, async function (req, res) {
  try {
    const authid = req.user.id; //req.headers.auth_id;
    console.log(authid);
    const userdetails = await User.findOne({ user: authid });
    console.log(userdetails);
    const user = await User.findById(userdetails._id, 'meets').populate({
      path: 'meets',
      populate: [
        {
          path: 'members',
          select: ['name'],
        },
        {
          path: 'host',
          select: ['name'],
        },
      ],
    });
    console.log(user);
    return res.status(200).json({
      meets: user.meets,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      SOMETHING_WENT_WRONG: 'Something went wrong, Please try again',
    });
  }
});

module.exports = router;
