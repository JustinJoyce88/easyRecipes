const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      author,
      cheerCount,
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
      author,
      cheerCount,
    });
    return newRecipe.save();
  },
  createUser: async (_, { input }) => {
    const { username, password } = input;
    const existingUser = await User.findOne({ username });
    if (!username && !password) {
      throw new Error('Username and password are required');
    }
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const newUser = new User({
      username: username,
      password: bcrypt.hashSync(password, 10),
      admin: false,
    });
    return newUser.save();
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
  login: async (_, { username, password }) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    return { token, userId: user._id.toString(), admin: user.admin, username: user.username };
  },
};
