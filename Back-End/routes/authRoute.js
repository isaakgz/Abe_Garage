const express = require('express');
const router = express.Router();
const {login, logout, } = require("../controllers/authController")


// login route
router.post('/',   login);

// logout route
router.get("/", logout)



module.exports = router;