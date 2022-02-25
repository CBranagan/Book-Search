const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    me(email: String!, password: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      user: ID!
      authors: [String!]
      description: String!
      title: String!
      bookId: String!
      image: String!
      link: String!
    ): User
    removeBook(user: String!, bookId: String!): User
  }
`;

module.exports = typeDefs;
