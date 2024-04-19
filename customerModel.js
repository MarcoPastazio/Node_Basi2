const { DataTypes } = require('sequelize');
const db = require('./connection_db_express');

const Customer = db.define('customer', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Customer;
