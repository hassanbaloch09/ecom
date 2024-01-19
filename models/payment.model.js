const { DataTypes } = require('sequelize');
const db = require("../models");

module.exports = (db) => {
    const Payment = db.sequelize.define('payment', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        razorpay_order_id: { type: DataTypes.STRING, allowNull: false, },
        razorpay_signature: { type: DataTypes.STRING, allowNull: false, },
        razorpay_payment_id: { type: DataTypes.STRING, allowNull: false, },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        user_name: { type: DataTypes.STRING, allowNull: false, allowNull: false, },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, },
        status: {
            type: DataTypes.STRING, allowNull: false,
            validate: {
                isIn: [['success', 'failed']]
            }
        },
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

    return Payment;
}

