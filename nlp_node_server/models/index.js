'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Successfully connect to MySQL!");
  })
  .catch((err) => {
    console.error(err);
  });

db.posts = require('./Post')(sequelize, Sequelize);

module.exports = db;
