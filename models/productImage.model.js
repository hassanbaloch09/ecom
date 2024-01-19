const { DataTypes } = require('sequelize');
const db = require(".");


module.exports = (db) => {
    const ProductImage = db.sequelize.define('productImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    url: {type: DataTypes.STRING,allowNull: false,},
    }, {
        timestamps: true,
        underscored: true,
    });

    return ProductImage;
};
