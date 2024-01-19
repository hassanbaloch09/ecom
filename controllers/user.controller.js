const jwt = require('jsonwebtoken');
const { Op, QueryTypes } = require("sequelize");
const db = require("../models");
const User = db.users;
const bcrypt = require('bcryptjs');

const getWhere = (_body) => {
    let _where = [];

    if (_body?.username) {
        _where.push({ username: _body?.username || new Date().getTime() + "" });
    }
    if (_body?.email) {
        _where.push({ email: _body?.email || new Date().getTime() + "" });
    }
    if (_body?.mobile) {
        _where.push({ mobile: _body?.mobile_country_code + _body?.mobile || new Date().getTime() + "" });
    }
    return _where;
}


exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        if (user.isEmailVerified) {
            return res.status(400).send({ message: 'User Email is already verified.' });
        }

        // console.log("Is verify",token===user.verificationToken)
        if (!token === user.verificationToken) {
            throw new Error("Something went wrong")
        }
        user.isEmailVerified = true;
        user.verificationToken = ""
        let data = {
            id: user?.id,
            email: user?.email,
            full_name: user?.full_name,
            photo_url: user?.photo_url,
        };
        data.token = jwt.sign(data);
        await user.save();
        return res.status(200).send({ message: 'User verified successfully.', user, data });
    } catch (err) {
        return res.status(400).send({ message: 'Invalid or expired token.' });
    }
}

exports.signup = async (req, res) => {
    try {
        const { email, phone_number, password,full_name,address  } = req.body;
        username = req.body?.username || req.body?.email || req.body?.phone_number;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            phone_number,
            password: hashedPassword,
            full_name,
            address
        });

        let data = {
            id: newUser?.id,
            email: newUser?.email,
            phone_number: newUser?.phone_number,
            full_name: newUser?.full_name,
        };
        const token = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE
        })
        newUser.token=token
        await newUser.save()
        res.status(201).json({ message: "user created successfully",token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({
            where: {
                email,
            },
        });
        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userData = {
            id: existingUser.id,
            email: existingUser.email,
            phone_number: existingUser.phone_number,
            full_name: existingUser.full_name,
        };

        const token = jwt.sign(userData, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE,
        });

        res.status(200).json({ message: 'Authentication successful', token,existingUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};