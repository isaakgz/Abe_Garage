const express = require('express'); 
const router = express.Router();
const {getServices, getService, addService, updateService, deleteService} = require("../controllers/serviceController");
const {adminMiddleware, authMiddleware } = require("../middlewares/authMiddleware")


//get all services
router.get('/', getServices);

//get a service
router.get('/:id', getService);


//add a service
router.post('/',authMiddleware, addService);

//update a service
router.put('/:id', updateService);

//delete a service
router.delete('/:id', deleteService);

module.exports = router;