const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    recipes(filter: RecipesFilterInput): [Recipe!]!
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
  }

  type Recipe {
    id: ID!
    name: String!
    description: String!
    cookTime: String!
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

  input RecipesFilterInput {
    curatorFavorited: Boolean
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
  }
`;


