const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const passport = require('passport');
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['username', 'picture'])
      .then(profile => {
        if (!profile) {
          errors.profile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      });
  }
);

// @route   POST api/profile
// @desc    POST update / create new  user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const body = req.body;
    const newProfile = {};
    newProfile.user = req.user.id;
    if (body.status) newProfile.status = body.status;
    if (body.bio) newProfile.bio = body.bio;
    if (typeof body.speciality === 'string')
      newProfile.speciality = body.speciality.split(',');
    if (typeof body.hobby === 'string')
      newProfile.hobby = body.hobby.split(',');

    newProfile.social = {};
    if (body.youtube) newProfile.social.youtube = body.youtube;
    if (body.twitter) newProfile.social.twitter = body.twitter;
    if (body.facebook) newProfile.social.facebook = body.facebook;
    if (body.instagram) newProfile.social.instagram = body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: newProfile.user },
            { $set: newProfile },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => {
              console.log(err);
              return res.status(500).end();
            });
        } else {
          // Create

          new Profile(newProfile).save().then(profile => res.json(profile));
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      });
  }
);

module.exports = router;
