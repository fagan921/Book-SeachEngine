import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { SAVE_BOOK } from '../utils/mutations';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {
  // State for holding book search results
  const [searchedBooks, setSearchedBooks] = useState([]);
  // State for holding search input
  const [searchInput, setSearchInput] = useState('');
  // State to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // Mutation to save books
  const [saveBookMutation] = useMutation(SAVE_BOOK);

  // Effect to store saved books in local storage
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  }, [savedBookIds]);

const GOOGLE_API_KEY = "AIzaSyCQXwrppT5LkwL2uSsjf-EKoJngiFnHa2E"; // Add your API key

const handleFormSubmit = async (event) => {
  event.preventDefault();

  if (!searchInput) {
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const { items } = await response.json();

    const bookData = items.map((book) => ({
      bookId: book.id,
      authors: book.volumeInfo.authors || ["No author to display"],
      title: book.volumeInfo.title,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail || "",
      link: book.volumeInfo.infoLink || "",
    }));

    setSearchedBooks(bookData);
    setSearchInput("");
  } catch (err) {
    console.error(err);
  }
};
  // Function to handle saving a book
  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // Get auth token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return;

    try {
      const { data } = await saveBookMutation({
        variables: { bookData: { ...bookToSave } },
      });

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                      View on Google Books
                    </a>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;