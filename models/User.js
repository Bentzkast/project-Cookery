const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// a user fields
const userSchema = new Schema({
  name: {
    type: string,
    required: true
  },
  email: {
    type: string,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  picture: {
    type: string,
    required: true
  },
  registered: {
    type: Date,
    default: Date.now()
  }
});

// the table/relation name
module.exports = user = mongoose.model("users", userSchema);
