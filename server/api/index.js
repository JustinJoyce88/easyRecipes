require('dotenv').config();
const connectDB = require('../config/db');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('../schema/schema');
const { Query } = require('../resolvers/Query');
const { Mutation } = require('../resolvers/Mutation');
const { Category } = require('../resolvers/Category');
const { Recipe } = require('../resolvers/Recipe');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const express = require('express');
const cors = require('cors');

// Connect to db connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Category,
      Recipe,
      Mutation,
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

module.exports = httpServer;
