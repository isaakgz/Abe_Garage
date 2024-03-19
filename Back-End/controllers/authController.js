// Auth Controller
const session = require("express-session");
const authServices = require("../services/authService");


// @desc    login user
// @route   POST /api/login
// @access  Public

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        //check if email and password are provided
        if(!email || !password){
            return res.status(400).json({message: "Please provide email and password"})
        }

        //check if the user exists in the database and status is active
        const userExists = await authServices.doesEmployeeRegistered(email);
        if(!userExists) {
            return res.status(401).json({message: "User does not exist or is not active. Please register or contact the admin."})
        }

        //if the user exists, check if the password is correct
        const isMatch = await authServices.isPasswordMatch(email, password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid credentials, please try again."})
        } else{
            //if the password is correct, generate a token
            const token = await authServices.generateToken(email);

            //store the token in a cookie
            req.session.authorization = {
                token: token,
                email: email
            }
        }

        //send a response
        res.status(200).json({message: "User logged in successfully"})
    } catch (error) {
        console.error(error);
        next(error);
        
    }
}

// @desc    logout user
// @route   GET /api/logout
// @access  Private

const logout = async (req, res) => {

    //clear the session
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).json({message: "Internal Server Error"})
        }
    })

    res.clearCookie("authorization");

    //send a response
    res.status(200).json({message: "User logged out successfully"})
    
}



module.exports = {login, logout}