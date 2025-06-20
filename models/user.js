const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING, // S3 URL if uploaded
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user', // 'admin' or 'user'
  },
}, {
  timestamps: true,
});

module.exports = User;
