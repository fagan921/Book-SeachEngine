# Book Search Engine

## Overview
Most modern websites are driven by two things: data and user demands. The ability to personalize user data is the cornerstone of real-world web development today. As user demands evolve, applications need to be more performant.

**Book Search Engine** is a fully functioning Google Books API search engine built with a RESTful API, which has been refactored to use GraphQL API built with Apollo Server. The app is built using the MERN stack, with a React front end, MongoDB database, and Node.js/Express.js server and API. Users can save book searches to the back end.

## Features
- Search for books using the Google Books API
- Save book searches to the backend
- GraphQL API built with Apollo Server
- Authentication middleware
- Apollo Provider for client-server communication
- Deployment on Render with MongoDB Atlas

## User Story
**As an avid reader,**  
**I want to search for new books to read,**  
**So that I can keep a list of books to purchase.**

## Acceptance Criteria
- **Given** a book search engine
- **When** I load the search engine
  - **Then** I am presented with a menu with the options Search for Books and Login/Signup, an input field to search for books, and a submit button
- **When** I click on the Search for Books menu option
  - **Then** I am presented with an input field to search for books and a submit button
- **When** I am not logged in and enter a search term in the input field and click the submit button
  - **Then** I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
- **When** I click on the Login/Signup menu option
  - **Then** a modal appears with a toggle between login and signup options
- **When** the toggle is set to Signup
  - **Then** I am presented with inputs for a username, email address, password, and a signup button
- **When** the toggle is set to Login
  - **Then** I am presented with inputs for an email address and password, and a login button
- **When** I enter valid signup/login credentials
  - **Then** my user account is created/I am logged in to the site
- **When** I am logged in to the site
  - **Then** the menu options change to Search for Books, Saved Books, and Logout
- **When** I enter a search term and click submit
  - **Then** I am presented with search results with book details and a save button
- **When** I click the Save button on a book
  - **Then** that book is saved to my account
- **When** I click on Saved Books
  - **Then** I am presented with all saved books with details and a remove button
- **When** I click the Remove button on a book
  - **Then** that book is removed from my saved books list
- **When** I click on Logout
  - **Then** I am logged out and presented with the Search for Books and Login/Signup menu options

## Mock-Up
The following animations show the application's appearance and functionality:
- **Search Books**: User can type a search term and see results.
- **Save Books**: User can save books by clicking "Save This Book!" button.
- **View Saved Books**: User can view their saved books on a separate page.

## Getting Started
### Refactoring to GraphQL API
To use a GraphQL API, you need to:
1. **Back-End**:
   - **auth.ts**: Update the auth middleware function.
   - **server.ts**: Implement the Apollo Server.
   - **Schemas**:
     - **index.ts**: Export typeDefs and resolvers.
     - **resolvers.ts**: Define query and mutation functionality.
     - **typeDefs.ts**: Define Query and Mutation types.

2. **Front-End**:
   - **queries.ts**: Define GET_ME query.
   - **mutations.ts**: Define LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK mutations.
   - **App.tsx**: Create an Apollo Provider.
   - **SearchBooks.tsx**: Use Apollo useMutation() for SAVE_BOOK.
   - **SavedBooks.tsx**: Use Apollo useQuery() for GET_ME and useMutation() for REMOVE_BOOK.
   - **SignupForm.tsx**: Use ADD_USER mutation.
   - **LoginForm.tsx**: Use LOGIN_USER mutation.

### Deployment
Deploy the application to Render with a MongoDB database using MongoDB Atlas. Follow the [Deploy with Render and MongoDB Atlas](https://render.com/docs/deploy-to-render) walkthrough for instructions.

## License
This project is licensed under the MIT License.

---

Let's get coding and bring this search engine 
