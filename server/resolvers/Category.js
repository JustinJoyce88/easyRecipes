const Recipe = require('../models/Recipe');

exports.Category = {
  recipes: async ({ id }) => {
    try {
      const recipes = await Recipe.find({ categoryId: id });
      return recipes;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to get category');
    }
  },
};
