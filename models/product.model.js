const { DataTypes } = require('sequelize');
const db = require("../models");

module.exports = (db) => {
    const Product = db.sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    sub_category_id: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, },
    description: { type:DataTypes.STRING,allowNull: false,},
    rich_description: { type:DataTypes.STRING,},
    image: {type: DataTypes.STRING,defaultValue: ''},
    // images: {
    //     type: DataTypes.JSON,
    //     defaultValue: [],
    // },
    brand: {type: DataTypes.STRING, defaultValue: ''},
    count_in_stock: {type:DataTypes.INTEGER,allowNull:false,min: 0,},

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


return Product;
}

