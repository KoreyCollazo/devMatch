// const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

<<<<<<< HEAD
// const messageSchema = new Schema({
//   message: {
//     unique: true,
//     type: String,
//     minlength: 2,
//     maxlength: 280,
//     trim: true
//   },
//   messageAuthor: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     get: (timestamp) => dateFormat(timestamp)
//   }
// });
=======
const messageSchema = new Schema({
  message: {
    type: String,
    minlength: 2,
    maxlength: 280,
    trim: true
  },
  messageAuthor: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  }
});
>>>>>>> origin/main

// const Message = model('Message', messageSchema);

<<<<<<< HEAD
// module.exports = Message;
=======
module.exports = Message;
>>>>>>> origin/main
