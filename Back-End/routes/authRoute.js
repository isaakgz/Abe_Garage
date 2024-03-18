const express = require('express');
const router = express.Router();
const {login} = require("../controllers/authController")


// login route
router.post('/',   login);


module.exports = router;