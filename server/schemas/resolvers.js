const { AuthenticationError } = require('apollo-server-express');
const { Profile, User, Message } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: () => {
      return Profile.find();
    },

    users: () => {
      return User.find();
    },

    // message: async (parent, { messageId }) => {
    //   return Message.findOne({ _id: messageId });
    // },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addProfile: async (parent, { name, age, email, password }) => {
      const profile = await Profile.create({ name, age, email, password });
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

    // Add a third argument to the resolver to access data in our `context`
    // addSkill: async (parent, { profileId, skill }, context) => {
    //   // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
    //   if (context.user) {
    //     return Profile.findOneAndUpdate(
    //       { _id: profileId },
    //       {
    //         $addToSet: { skills: skill }
    //       },
    //       {
    //         new: true,
    //         runValidators: true
    //       }
    //     );
    //   }
    //   // If user attempts to execute this mutation and isn't logged in, throw an error
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    // removeProfile: async (parent, args, context) => {
    //   if (context.user) {
    //     return Profile.findOneAndDelete({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // Make it so a logged in user can only remove a skill from their own profile
  //   removeSkill: async (parent, { skill }, context) => {
  //     if (context.user) {
  //       return Profile.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { skills: skill } },
  //         { new: true }
  //       );
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   }
  }
};

module.exports = resolvers;
