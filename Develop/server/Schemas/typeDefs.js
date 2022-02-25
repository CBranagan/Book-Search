const { gql } = require("apollo-server-express");

const typeDefs = gql`

type user {
    _id
    username
    email
    bookCount
    savedBooks: []
}`;

module.exports = typeDefs;
