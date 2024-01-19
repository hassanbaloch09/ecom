const { DataTypes } = require('sequelize');
const db = require("../models");

module.exports = (db) => {
const Chat = db.sequelize.define('chat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
  sender_id: {type: DataTypes.INTEGER,allowNull: false,},
  receiver_id: {type: DataTypes.INTEGER,allowNull: false,},
  sender_name: {type: DataTypes.STRING,allowNull: false,},
  message: {type: DataTypes.TEXT,allowNull: false,},
  status: {
    type: DataTypes.STRING,
    validate: {
        isIn: [['success', 'failed']]
    }
}
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

return Chat;
}

