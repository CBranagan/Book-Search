import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $email: String!
    $description: String
    $title: String
    $bookId: String!
    $image: String
    $authors: [String]
  ) {
    saveBook(
      email: $email
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      authors: $authors
    ) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($email: String!, $bookId: String!) {
    removeBook(email: $email, bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
      }
    }
  }
`;
