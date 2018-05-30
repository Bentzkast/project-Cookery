const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// a user fields
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  speciality: {
    type: [String]
  },
  hobby: {
    type: [String]
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// the table/relation name
module.exports = Profile = mongoose.model('profiles', profileSchema);
