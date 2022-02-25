const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      return User.find().select("-__v").populate("books");
    },
  },
};

module.exports = resolvers;
