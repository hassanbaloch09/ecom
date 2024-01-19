const { DataTypes } = require('sequelize');
const db = require("../models");

module.exports = (db) => {
const SubCategory = db.sequelize.define('subCategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING, allowNull: false, },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
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

return SubCategory;
}
