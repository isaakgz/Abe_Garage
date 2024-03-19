const jwt = require('jsonwebtoken');
const session = require('express-session');
const db = require('../config/dbConfig');

// middleware to check if the user is authenticated

const authMiddleware = async (req, res, next) => {

    //check if the token is provided 
    if (!req.session.authorization) {
        return res.status(401).json({message: "Not authorized to access this route"})
    } else {
        //if the token is provided, store the token in a variable
        const token = req.session.authorization["token"];

        //verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(401).json({message: "Not verified"})
            } else {
                //if the token is verified, store the decoded token in the request object
                req.user = user;
        
                //check if the user is a manager
                let sql = "SELECT * FROM employee_role WHERE employee_id = ?";
                try {
                    const result = await db.query(sql, [user.employeeId]);
                    if (result[0].company_role_id === 1) {
                        req.user.isManager = true;
                    } else {
                        req.user.isManager = false;
                    }
                    next();
                } catch (err) {
                    return res.status(500).json({message: "Internal Server Error"})
                }
            }
        })}
}


//admin middleware
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isManager) {
        next();
    } else{
        return res.status(401).json({message: "Not authorized to access this route as an admin"})
    }
}

  

module.exports = {authMiddleware, adminMiddleware}