const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        let token = req.header("Authorization").replace("Bearer ", "");
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        let user = await User.findOne({_id: decodedToken._id, "tokens.token": token});
        
        if(!user) {
            throw new Error("Authentication Error");
        }
        
        req.token = token;
        req.user = user;
        
        next();
    } catch (error) {
        res.status(412).send({message: "Not signed in"});
    }
}

module.exports = auth;