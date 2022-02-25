const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const bookSchema = require("../models/Book");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args) => {
      return User.find({}).select("-__v").populate("books");
    },
    me: async (parent, { email, password }, context) => {
      return User.findOne({ email, password }).select("-__v").populate("books");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new AuthenticationError("Incorrect name credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (parent, { email, password, username }, context) => {
      const user = await User.create({
        email: email,
        password: password,
        username: username,
      });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (
      parent,
      { user, title, authors, description, bookId, image, link },
      context
    ) => {
      return await User.findOneAndUpdate(
        { _id: user },
        {
          $push: {
            savedBooks: {
              title,
              authors,
              description,
              bookId,
              image,
              link,
            },
          },
        },
        { new: true }
      );
    },
    removeBook: async (parent, { user, bookId }, context) => {
      return await User.findOneAndUpdate(
        { _id: user },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
