require('dotenv').config();
const connectDB = require('./config/db');
const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/schema');
const { Query } = require('./resolvers/Query');
const { Mutation } = require('./resolvers/Mutation');
const { Category } = require('./resolvers/Category');
const { Recipe } = require('./resolvers/Recipe');
const colors = require('colors');

// Connect to db connection
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Recipe,
    Mutation,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
