const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.Mutation = {
  addCategory: (root, { input }) => {
    const { name, image } = input;
    const newCategory = new Category({
      name,
      image,
    });
    return newCategory.save();
  },
  addRecipe: (root, { input }) => {
    const {
      name,
      description,
      cookTime,
      ingredients,
      image,
      curatorFavorited,
      instruction,
      categoryId,
    } = input;
    const newRecipe = new Recipe({
      name,
      description,
      cookTime,
      ingredients,
      image,
      curatorFavorited,
      instruction,
      categoryId,
    });
    return newRecipe.save();
  },
  deleteCategory: async (root, { id }) => {
    try {
      // Delete the category
      await Category.findByIdAndRemove(id);

      // Delete all recipes associated with the category
      await Recipe.deleteMany({ categoryId: id });

      return true;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to delete category');
    }
  },
  deleteRecipe: async (root, { id }) => {
    try {
      // Delete the category
      await Recipe.findByIdAndRemove(id);

      return true;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to delete category');
    }
  },
  updateCategory: async (root, { id, input }) => {
    try {
      const updatedEntry = await Category.findByIdAndUpdate(id, input, {
        new: true, // Return the updated entry
      });

      return updatedEntry;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to update entry');
    }
  },
  updateRecipe: async (root, { id, input }) => {
    try {
      const updatedEntry = await Recipe.findByIdAndUpdate(id, input, {
        new: true, // Return the updated entry
      });

      return updatedEntry;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to update entry');
    }
  },
};
