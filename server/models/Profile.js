const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// const userSchema =('./User')

const profileSchema = new Schema(
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
    // matches: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "userSchema",
    //   },
    // ],
    // savedMatches: [userSchema],
    // messages: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Message',
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.virtual('matchCount').get(function () {
//   return this.savedMatches.length;
// });

const Profile = model('Profile', profileSchema);

module.exports = Profile;
