const jwt = require('jsonwebtoken');
const session = require('express-session');

// middleware to check if the user is authenticated

const authMiddleware = (req, res, next) => {

    //check if the token is provided 
    if (!req.session.authorization) {
        return res.status(401).json({message: "Not authorized to access this route"})
    } else {
        //if the token is provided, store the token in a variable
        const token = req.session.authorization["token"];

        //verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({message: "Not verified"})
            } else {
                //if the token is verified, store the decoded token in the request object
                req.user = user;
                next();
            }
        })}}


module.exports = {authMiddleware}