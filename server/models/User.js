// const { Schema, model } = require('mongoose');

<<<<<<< HEAD
// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     age: {
//       type: Number,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     bio: {
//       type: String,
//       required: true,
//       minlength: 2,
//       maxlength: 280,
//       trim: true
//     },
//     gender: {
//       type: String,
//       required: true
//     },
//     image: {
//       type: String
//     }
//     // profile: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Profile'
//     // }
//   },
//   {
//     toJSON: {
//       virtuals: true
//     }
//   }
// );
=======
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
>>>>>>> origin/main

// const User = model('User', userSchema);

<<<<<<< HEAD
// module.exports = User;
=======
module.exports = User;
>>>>>>> origin/main
