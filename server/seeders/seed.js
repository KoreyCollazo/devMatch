/* eslint-disable no-useless-catch */
const db = require('../config/connection');
const { Profile } = require('../models');
const profileSeeds = require('./profileSeeds.json');
// const userSeeds = require('./userSeeds.json');
// const messageSeeds = require('./messageSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    // await User.deleteMany({});
    // await messageSeeds.deleteMany({});

    await Profile.create(profileSeeds);
    // await User.create(userSeeds);
    // await Message.create(messageSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
