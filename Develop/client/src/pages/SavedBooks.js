import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { removeBookId } from "../utils/localStorage";
import { REMOVE_BOOK } from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import auth from "../utils/auth";

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const [getMe, { data, error }] = useLazyQuery(GET_ME);
  const [removeBook, { bootData, bootError }] = useMutation(REMOVE_BOOK);

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const email = Auth.getProfile().data.email;
        console.log(email);

        if (!token) {
          return false;
        }

        const response = await getMe({ variables: { email: email } });
        console.log(response.data.me);

        // if (!response.ok) {
        //   throw new Error("something went wrong!");
        // }

        const user = response.data.me;
        console.log(user);
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    const email = Auth.getProfile().data.email;

    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({
        variables: {
          email: email,
          bookId: bookId,
        },
      });

      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }
      console.log(response.data.removeBook);
      const updatedUser = response.data.removeBook;
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
