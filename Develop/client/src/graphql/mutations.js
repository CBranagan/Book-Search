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
    $user: ID!
    $description: String!
    $title: String!
    $bookId: String!
    $image: String!
    $link: String!
    $authors: [String!]
  ) {
    saveBook(
      user: $user
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
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
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($user: String!, $bookId: String!) {
    removeBook(user: $user, bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
      }
    }
  }
`;
