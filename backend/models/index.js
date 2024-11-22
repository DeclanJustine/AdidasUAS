const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== path.basename(__filename) && file.slice(-3) === ".js")
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  
  });

db.sequelize = sequelize;

module.exports = db;
