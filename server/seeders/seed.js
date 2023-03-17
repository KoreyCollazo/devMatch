/* eslint-disable no-useless-catch */
const db = require('../config/connection');
const { Profile } = require('../models');
const profileSeeds = require('./profileSeeds.json');
<<<<<<< HEAD
// const userSeeds = require('./userSeeds.json');
// const messageSeeds = require('./messageSeeds.json');
=======
const userSeeds = require('./userSeeds.json');
// eslint-disable-next-line no-unused-vars
const messageSeeds = require('./messageSeeds.json');
>>>>>>> origin/main

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
<<<<<<< HEAD
    // await User.deleteMany({});
    // await messageSeeds.deleteMany({});
=======
    await User.deleteMany({});
    // awai.deleteMany({});
>>>>>>> origin/main

    await Profile.create(profileSeeds);
    // await User.create(userSeeds);
    // await Message.create(messageSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
