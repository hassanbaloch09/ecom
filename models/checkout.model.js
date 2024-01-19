const { DataTypes } = require('sequelize');
const db = require("../models");
module.exports = (db) => {
    const Checkout = db.sequelize.define('Checkout', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        items: { type: DataTypes.JSON, allowNull: false },
        total_price: {
            type: DataTypes.FLOAT, allowNull: false
        },
        delivery_charge: { type: DataTypes.FLOAT, allowNull: false },
        pay_able_amount: { type: DataTypes.FLOAT, allowNull: false }
    }, {
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

    return Checkout;
}

