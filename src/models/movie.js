const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  

const Movie = sequelize.define('Movie', {
  
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 1850,
      max: new Date().getFullYear() + 5
    }
  },
});


module.exports = Movie;