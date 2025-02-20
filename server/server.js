require('dotenv').config(); // ✅ Load environment variables

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// ✅ Define `app` first
const app = express();

// ✅ Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startApolloServer() {
  await server.start();

  // ✅ Middleware setup after `app` is defined
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // ✅ Fix: Apply CORS properly
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  // ✅ Apply Apollo middleware
  app.use('/graphql', expressMiddleware(server));

  // ✅ Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // ✅ Connect to MongoDB and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now running on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL API available at http://localhost:${PORT}/graphql`);
    });
  });
}

// ✅ Start the server
startApolloServer();