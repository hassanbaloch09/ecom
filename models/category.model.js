const { DataTypes } = require('sequelize');
const db = require("../models");

module.exports = (db) => {
const Category = db.sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING},
},{
    timestamps: true, underscored: true,
    hooks: {
        beforeCreate: async (o, options) => {
            o.created_at = new Date();
            o.updated_at = new Date();
        },
        beforeUpdate: async (o, options) => {
            o.updated_at = new Date();
        }
    }
});
return Category;
}
