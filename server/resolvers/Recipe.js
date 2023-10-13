const Category = require('../models/Category');

exports.Recipe = {
  category: async ({ categoryId }) => {
    try {
      const category = await Category.findById(categoryId);
      return category;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to get category');
    }
  },
};
