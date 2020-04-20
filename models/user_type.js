const Sequelize = require('sequelize');
const db = require('../config/database');

const User_type = db.define(
  'user_type',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  }
);

module.exports = User_type;
