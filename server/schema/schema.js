const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    recipes(filter: RecipesFilterInput, offset: Int, limit: Int): RecipeConnection!
    recipe(id: ID!): Recipe
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addRecipe(input: AddRecipeInput!): Recipe!
    deleteCategory(id: ID!): Boolean!
    deleteRecipe(id: ID!): Boolean!
    updateRecipe(id: ID!, input: UpdateRecipeInput!): Recipe
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    login(username: String!, password: String!): User!
    createUser(input: CreateUserInput!): NewUser!
  }

  input CreateUserInput {
    username: String!
    password: String!
  }

  type NewUser {
    id: ID!
    username: String!
    password: String!
    admin: Boolean
  }

  type User {
    token: String!
    userId: ID!
    admin: Boolean!
    username: String!
  }

  type Recipe {
    id: ID!
    name: String!
    description: String!
    author: String!
    cookTime: String!
    cheerCount: Int!
    ingredients: [String!]!
    image: String!
    instruction: [String!]!
    curatorFavorited: Boolean!
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
    image: String!
    recipes: [Recipe!]!
  }

  type RecipeConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [RecipeEdge!]!
  }

  type RecipeEdge {
    cursor: String!
    node: Recipe!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  input RecipesFilterInput {
    curatorFavorited: Boolean
    categoryId: ID
  }

  input AddCategoryInput {
    name: String!
    image: String!
  }

  input UpdateCategoryInput {
    name: String
    image: String
  }

  input AddRecipeInput {
    name: String!
    description: String!
    cookTime: String!
    ingredients: [String!]!
    image: String!
    instruction: [String!]!
    curatorFavorited: Boolean!
    categoryId: ID!
    cheerCount: Int!
    author: String!
  }

  input UpdateRecipeInput {
    name: String
    description: String
    cookTime: String
    ingredients: [String!]
    image: String
    instruction: [String!]
    curatorFavorited: Boolean
    categoryId: ID
    cheerCount: Int
    author: String
  }
`;
