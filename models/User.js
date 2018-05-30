const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// a user fields
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  registered: {
    type: Date,
    default: Date.now()
  }
});

// the table/relation name
module.exports = User = mongoose.model('users', userSchema);
