const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    // users: async () => {
    //   return User.find();
    // },

    // messages: async () => {
    //   return User.find();
    // },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    // user: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId });
    // },

    // message: async (parent, { messageId }) => {
    //   return Message.findOne({ _id: messageId });
    // },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addProfile: async (parent, { firstName, lastName, age, gender, email, password }) => {
      const profile = await Profile.create({ firstName, lastName, age, gender, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
