const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlenght: 15
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlenght: 15
  },
  age: {
    type: Number,
    required: true,
    minlength: 2,
    maxlenght: 2,
    trim: true
  },
  gender: {
    type: String,
    required: true
  },
  photos: {
    type: String
  },
  bio: {
    type: String,
    minlength: 2,
    maxlenght: 200
  },
  education: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  height: {
    type: String
  },
  ethinicity: {
    type: String
  },
  answers: {
    type: Array
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
