const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  cookTime: String,
  ingredients: {
    type: [String],
    required: true,
  },
  image: String,
  curatorFavorited: Boolean,
  cheerCount: Number,
  instruction: {
    type: [String],
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
