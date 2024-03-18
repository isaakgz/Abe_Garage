const express = require('express');
const router = express.Router();
const {login, logout, } = require("../controllers/authController")


// login route
router.post('/login',   login);

// logout route
router.get("/logout", logout)



module.exports = router;