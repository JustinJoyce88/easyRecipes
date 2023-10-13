const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.Query = {
  recipes: async (root, args) => await Recipe.find(),
  recipe: async (root, { id }) => await Recipe.findById(id),
  categories: async (root, args) => await Category.find(),
  category: async (root, { id }) => await Category.findById(id),
};
