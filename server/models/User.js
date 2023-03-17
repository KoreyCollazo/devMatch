const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      unique: true,
      trim: true
    },
    bio: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
    // profile: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Profile'
    // }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

const User = model('User', userSchema);

module.exports = User;
