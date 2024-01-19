const {DataTypes} = require("sequelize");
const db = require("../models");
module.exports = (db) => {
    const Users = db.sequelize.define("users", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: DataTypes.STRING(100), defaultValue: ""},
        email: {type: DataTypes.STRING(100), allowNull: false},
        phone_number: {type: DataTypes.STRING(20),allowNull: false,},
        password: {type: DataTypes.STRING,allowNull: false,},
        avatar_url: {type: DataTypes.STRING(1000), defaultValue: ""},   
        full_name: {type: DataTypes.STRING, allowNull: false,},
        token: {type: DataTypes.TEXT, defaultValue: ""}, 
        refresh_token: {type: DataTypes.STRING, defaultValue: ""},
        otp: {type: DataTypes.STRING(10), defaultValue: ""},
        address: {type: DataTypes.STRING, allowNull: true},
        // created_at: {
        //     allowNull: false,
        //     type: db.Sequelize.DATE,
        //     defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
        //     field: 'created_at',
        // },
        // updated_at: {
        //     allowNull: false,
        //     type: db.Sequelize.DATE,
        //     defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
        //     field: 'updated_at',
        // }
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
    return Users;
};
