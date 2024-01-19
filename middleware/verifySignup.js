const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const User = db.users;
const jwt = require('jsonwebtoken');


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const _body = req.body;
        let _where = [];
        if (_body?.username) {
            _where.push({ username: _body.username });
        }
        if (_body?.email) {
            _where.push({ email: _body.email });
        }
        if (_body?.phone_number) {
            _where.push({ phone_number: _body.phone_number });
        }

        if (_where.length > 0) {
            const existingUser = await User.findOne({ where: { [Op.or]: _where } });

            if (!existingUser) {
                next();
            } else {
                return res.status(400).json({ message: "Failed! Username, email, or mobile is already in use!" });
            }
        } else {
            return res.status(400).json({ message: "Failed! Username, email, or mobile is required!" });
        }
    } catch (error) {
        console.error('Error in checkDuplicateUsernameOrEmail:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const validateToken = async (req, res, next) => {
    let token = String(req.headers['authorization'] || req.headers['x-access-token']);

    if (!token) {
        return res.status(401).send({ message: "Unauthorized access! Token missing." });
    }

    if (token.startsWith('Bearer ')) {
        token = token.substring(7);
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken && decodedToken.id) {
            req.user = decodedToken;
            next();
        } else {
            return res.status(401).send({ message: "Unauthorized access! Invalid token." });
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(498).send({ message: "Failed! Token has expired." });
        } else {
            console.error('Error in validateToken:', error);
            return res.status(500).send({ message: "Internal Server Error." });
        }
    }
};



module.exports = { checkDuplicateUsernameOrEmail, validateToken };
