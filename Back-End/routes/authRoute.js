const app = require('express');
const router = app.Router();
const {login} = require("../controllers/authController")


//login route
router.post('/', login)


module.exports = router;