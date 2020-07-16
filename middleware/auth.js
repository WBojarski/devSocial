const jwt = require("jsonwebtoken");
const config = require("config");
const { restart } = require("nodemon");

module.exports = (req, res, next) => {
    //get token from header
    const token = req.header("x-auth-token");

    //check if not token

    if (!token) {
        return res.status(401).json({ msg: "No token, authorisation denied" });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
