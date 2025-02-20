const { AuthenticationError } = require('@apollo/server/errors');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    async me(_, __, context) {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('Not authenticated');
    },
  },

  Mutation: {
    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    async addUser(_, { username, email, password }) {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    async saveBook(_, { bookId, authors, title, description, image, link }, context) {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        {
          $addToSet: {
            savedBooks: { bookId, authors, title, description, image, link },
          },
        },
        { new: true }
      );

      return updatedUser;
    },

    async removeBook(_, { bookId }, context) {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;