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
  type: DataTypes.TEXT,
  allowNull: false,
  get() {
    const raw = this.getDataValue('category');
    return raw ? JSON.parse(raw) : [];
  },
  set(value) {
    this.setDataValue('category', JSON.stringify(value));
  }
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
  allowNull: false
},
difficulty: {
  type: DataTypes.ENUM('easy', 'medium', 'hard'),
  allowNull: false,
}

}, {
  timestamps: true,
});

module.exports = Recipe;
