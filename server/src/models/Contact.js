const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  propertyId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  propertyTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'contact-page',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'new',
  },
});

Contact.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });

module.exports = Contact;
