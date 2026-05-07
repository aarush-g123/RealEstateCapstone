// src/models/AnalyticsEvent.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AnalyticsEvent = sequelize.define("AnalyticsEvent", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.STRING(40),
    allowNull: false,
    defaultValue: "page_view",
  },
  path: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  propertyId: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  visitorId: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  referrer: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
  userAgent: {
    type: DataTypes.STRING(512),
    allowNull: true,
  },
  occurredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = AnalyticsEvent;