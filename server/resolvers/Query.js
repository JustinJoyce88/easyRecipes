const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const { shuffleArray } = require('../utils/shuffleArray');

exports.Query = {
  recipes: async (_, { filter, offset, limit }) => {
    const recipeFilter = {};

    if (filter) {
      if (filter.curatorFavorited) recipeFilter.curatorFavorited = filter.curatorFavorited;
      if (filter.categoryId) recipeFilter.categoryId = filter.categoryId;
      if (filter.author) recipeFilter.author = filter.author;
    }
    let recipes = await Recipe.find(recipeFilter).sort({ name: 'asc' }).skip(offset).limit(limit);
    if (filter.curatorFavorited) recipes = shuffleArray(recipes).slice(0, 5);

    const totalCount = await Recipe.countDocuments(recipeFilter);
    const edges = recipes.map((recipe) => ({
      cursor: recipe.id,
      node: recipe,
    }));
    const pageInfo = {
      hasNextPage: offset + limit < totalCount,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    };
    return {
      totalCount,
      edges,
      pageInfo,
    };
  },
  recipe: async (root, { id }) => await Recipe.findById(id),
  categories: async (root, args) => await Category.find().sort({ name: 'asc' }),
  category: async (root, { id }) => await Category.findById(id),
};
