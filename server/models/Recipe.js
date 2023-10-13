const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  cookTime: String,
  ingredients: {
    type: [String],
    required: true,
  },
  image: String,
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
