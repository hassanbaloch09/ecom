const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");



module.exports = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ where: { id: decode.id } })
        if (!user) {
            throw { message: "not authorized" }
        }
        req.user= user;
        next()
    } catch (err) {
        return res.status(401).send({ code: 401, message: "auth failed" })
    }

}