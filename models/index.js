const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");
const fs = require("fs");
const db = {};
db.Op = Op;
db.Sequelize = Sequelize;
db.sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    logging: process.env.DB_DEBUG === "true" ? console.info : false,
    freezeTableName: true,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
  }
);

db.sequelizeFileUpload = (filePath) =>
  new Sequelize(config.db.DB_NAME, config.db.DB_USER, config.db.DB_PASS, {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    logging: process.env.DB_DEBUG === "true" ? console.info : false,
    freezeTableName: true,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
    dialectOptions: {
      localInfile: true,
      infileStreamFactory: (path) => fs.createReadStream(filePath),
    },
  });

db.users = require("./user.model")(db);
db.product = require("./product.model")(db);
db.category = require("./category.model")(db);
db.subcategory = require("./subcategory.model")(db);
db.payment = require("./payment.model")(db);
db.payment = require("./payment.model")(db);
db.productImage = require("./productImage.model")(db);
db.checkout = require("./checkout.model")(db);
db.chat = require("./chat.model.js")(db);

db.product.belongsTo(db.category, { foreignKey: "category_id" });
db.category.hasMany(db.product, { foreignKey: "category_id" });
db.product.belongsTo(db.subcategory, { foreignKey: "sub_category_id" });
db.checkout.belongsTo(db.users, { foreignKey: "user_id" });
db.chat.belongsTo(db.users, { foreignKey: "sender_id" });
db.chat.belongsTo(db.users, { foreignKey: "receiver_id" });

module.exports = db;
