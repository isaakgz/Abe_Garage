const db = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
const {comparePassword} = require("../utils/passwordUtils");




// a function to check if the user exists and check his status (active or not)
const doesEmployeeRegistered = async (email) => {
    const  [rows_] = await db.query('SELECT * FROM employee WHERE employee_email = ?', [email]);
    const user = rows_[0];

    // Check if user is defined
    if (user) {
        const isActive = user.employee_active_status === 1 ? true : false;
        
        //if the user exists, return true
        if (isActive) {
            return true;
        } else {
            return false;
        }
    } else {
        // User does not exist
        return false;
    }
}

// a function to check user password is matching with the provided password

const isPasswordMatch = async (email, password) => {
    const [rows] = await db.query('SELECT * FROM employee WHERE employee_email = ?', [email]);
    const user = rows[0];
    const employeeId = user.employee_id;

    //get the hashed password from the database
    const [rows2] = await db.query(`SELECT employee_password_hashed FROM employee_pass WHERE employee_id = ?`, [employeeId]);
    const hashedPassword = rows2[0].employee_password_hashed;
    //compare the provided password with the hashed password
    const isMatch = await comparePassword(password, hashedPassword);
    
    //if the password is correct, return true
    if (isMatch) {
        return true;
    } else {
        return false;
    }

}

// a function to generate a token
const generateToken = async (email) => {

    const [rows] = await db.query('SELECT * FROM employee WHERE employee_email = ?', [email]);
    const user = rows[0];
    const employeeId = user.employee_id;

    return jwt.sign({employeeId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//export the functions
module.exports = {doesEmployeeRegistered, isPasswordMatch, generateToken}
