const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdBy: {
    type: String,
    required: true
  },
  creatorPicture: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  ingredients: {
    type: [String],
    required: true
  },
  directions: {
    type: [String],
    required: true
  },
  tags: {
    type: String
  },
  taste: {
    type: String
  },
  tips: {
    type: String
  },
  nutritions: {
    type: [String]
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      picture: {
        type: String
      },
      posted: {
        type: Date,
        default: Date.now
      }
    }
  ],
  posted: {
    type: Date,
    default: Date.now
  }
});

module.exports = Recipe = mongoose.model('recipes', recipeSchema);
