const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT, // you can JSON.stringify if storing arrays
    allowNull: false,
    get() {
    const rawValue = this.getDataValue('ingredients');
    return rawValue ? JSON.parse(rawValue) : [];
  },
  set(value) {
    this.setDataValue('ingredients', JSON.stringify(value));
  },
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cookingTime: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: false,
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, // store S3 link here
    allowNull: true,
  },
  category: {
  type: DataTypes.ENUM(
    'Appetizer', 'Breakfast', 'Lunch', 'Dinner', 'Main Course',
    'Side Dish', 'Dessert', 'Snack', 'Soup', 'Salad',
    'Beverage', 'Sauce', 'Bread', 'Rice', 'Pasta'
  ),
  allowNull: true
},
dietaryPreference: {
  type: DataTypes.ENUM(
    'vegetarian',
    'vegan',
    'non-vegetarian',
    'gluten-free',
    'dairy-free',
    'nut-free'
  ),
  allowNull: true
},
difficulty: {
  type: DataTypes.ENUM('easy', 'medium', 'hard'),
  allowNull: true,
}

}, {
  timestamps: true,
});

module.exports = Recipe;
