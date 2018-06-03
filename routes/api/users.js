const express = require('express');
const gravatar = require('gravatar');
const bycrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegistrationInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users/
// @desc    Get my users info
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // console.log(req);
    return res.json({
      id: req.user.id,
      email: req.user.email,
      username: req.user.username
    });
  }
);

// @route   POST api/users/register
// @desc    register for a new user
// @access  Public
router.post('/register', (req, res) => {
  // check for illegal input
  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find if exist
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // error response
      errors.email = 'Email already exist';
      res.status(400).json(errors);
    } else {
      // create model
      const picture = gravatar.url(req.body.email, {
        s: 200, // size
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        picture,
        password: req.body.password
      });
      // hash password
      bycrypt.genSalt(10, (err, salt) => {
        bycrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).end();
          }
          newUser.password = hash;
          // add to database
          newUser
            .save()
            .then(user => res.location('/login').end())
            .catch(err => {
              console.log(err);
              return res.status(500).end();
            });
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    obtain jwt token auth for a user
// @access  Public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ $or: [{ email }, { username }] }).then(user => {
    if (!user) {
      errors.user = 'User not found';
      return res.status(400).json(errors);
    }
    // check password
    bycrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = 'Password is incorrect';
        return res.status(400).json(errors);
      }

      //success
      // create a payload
      const payload = {
        id: user.id,
        username: user.username,
        picture: user.picture
      };
      // sign token
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).end();
        }
        return res
          .status(200)
          .json({ success: true, token: 'Bearer ' + token });
      });
    });
  });
  // check passowrd
});

module.exports = router;
