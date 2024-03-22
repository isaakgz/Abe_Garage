const express = require('express');
const router = express.Router();
const {getVehicleById, getVehicleByCustomerId, addVehicle, deleteVehicle, updateVehicle} = require("../controllers/vehicleController")



//get single vehicle by id
router.get('/:id', getVehicleById);

//get single vehicle by customer id
router.get('/', getVehicleByCustomerId);

//add vehicle
router.post('/', addVehicle);

//update vehicle
router.put('/:id', updateVehicle);

//delete vehicle
router.delete('/:id', deleteVehicle);





//add vehicle
router.post('/', (req, res) => {
    res.send('add vehicle');
});

//update vehicle
router.put('/:id', (req, res) => {
    res.send('update vehicle');
});

//delete vehicle
router.delete('/:id', (req, res) => {
    res.send('delete vehicle');
});

//get single vehicle by customer id
router.get('/', (req, res) => {
    // console.log(req.query.customerId)
    res.send('get single vehicle by customer id');
});

module.exports = router;