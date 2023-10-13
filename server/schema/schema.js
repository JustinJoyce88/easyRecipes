const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    recipes: [Recipe!]!
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
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
    recipes: [Recipe!]!
  }

  input RecipeFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }

  input AddRecipeInput {
    name: String!
    description: String!
    cookTime: String!
    ingredients: [String!]!
    image: String!
    instruction: [String!]!
    categoryId: ID!
  }

  input UpdateRecipeInput {
    name: String!
    description: String!
    cookTime: String!
    ingredients: [String!]!
    image: String!
    instruction: [String!]!
    categoryId: ID!
  }
`;


