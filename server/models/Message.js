const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema({
  message: {
    type: String,
    minlength: 2,
    maxlength: 280,
    trim: true,
  },
  messageAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Message = model('Message', messageSchema);

module.exports = Message;