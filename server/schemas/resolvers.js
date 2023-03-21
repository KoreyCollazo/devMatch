const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

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
          const myProfile = await User.findById(context.user._id).lean();
          const allProfiles = await User.find({
            _id: {
              $ne: context.user._id
            },
            answers: { $exists: true }
          }).lean();
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
    addUser: async (parent, { firstName, lastName, age, gender, location, email, password }) => {
      const user = await User.create({
        firstName,
        lastName,
        age,
        gender,
        location,
        email,
        password
      });
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
        try {
          // eslint-disable-next-line no-unused-vars
          const ret = await User.findByIdAndUpdate(
            context.user._id,
            {
              answers
            },
            { new: true }
          );

          return true;
        } catch (e) {
          console.log(e);
        }
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
