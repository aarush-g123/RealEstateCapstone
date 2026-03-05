// src/models/index.js
const sequelize = require('../config/db');
const User = require('./User');
const Contact = require('./Contact');
const AnalyticsEvent = require('./AnalyticsEvent');

// if you want more associations, do it here

module.exports = { sequelize, User, Contact, AnalyticsEvent };
