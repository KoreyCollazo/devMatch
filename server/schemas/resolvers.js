const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    getMatches: async (parent, args, context) => {
      if (context.user) {
        try {
          const myProfile = await User.findById(context.user._id);
          const allProfiles = await User.find({
            $ne: {
              _id: mongoose.ObjectId(context.user._id)
            },
            answers: { $exists: true }
          });
          const allProfilesWithMatches = allProfiles
            .map((profile) => ({
              ...profile,
              matchScore: profile.answers.reduce(
                (totalScore, currAnswer, i) => totalScore + (currAnswer === myProfile.answers[i]),
                0
              )
            }))
            .sort((a, b) => b.matchScore - a.matchScore);
          return allProfilesWithMatches;
        } catch (err) {
          console.log(err);
        }
      }
    }
  },

  Mutation: {
    addUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveAnswers: async (parent, { answers }, context) => {
      if (context.user) {
        await User.updateOne(
          {
            where: {
              _id: context.user._id
            }
          },
          {
            answers
          }
        );

        return true;
      }
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
