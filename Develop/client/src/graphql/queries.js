import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe($email: String!) {
    me(email: $email) {
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
