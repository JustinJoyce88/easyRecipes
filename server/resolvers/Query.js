const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const { shuffleArray } = require('../utils/shuffleArray');

exports.Query = {
  recipes: async (root, { filter }) => {
    const { curatorFavorited } = filter;
    let filteredRecipes = await Recipe.find().sort({ name: 'asc' });
    if (curatorFavorited) {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.curatorFavorited);
      filteredRecipes = shuffleArray(filteredRecipes).slice(0, 5);
    }
    return filteredRecipes;
  },
  recipe: async (root, { id }) => await Recipe.findById(id),
  categories: async (root, args) => await Category.find().sort({ name: 'asc' }),
  category: async (root, { id }) => await Category.findById(id),
};
