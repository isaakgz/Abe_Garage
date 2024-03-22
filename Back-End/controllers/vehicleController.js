const vehicleService = require("../services/vehicleService");
const {validateVehicle} =require("../utils/validation");


// @ desc Get a vehicle by id
// @route GET /api/vehicle/:id
// @access Private

const getVehicleById = async (req, res, next) => {
    try {
        //get vehicle id from the request parameters
        const vehicleId = req.params.id;

        const vehicle = await vehicleService.getVehicleById(vehicleId);
        return res.status(200).json(vehicle); 
    } catch (error) {
        next(error);
    }
};


// @ desc Get a vehicle by customer id
// @route GET /api/vehicle
// @access Private

const getVehicleByCustomerId = async (req, res, next) => {
    try {
        //get customer id from the request query
        const customerId = req.query.customerId;

        const vehicle = await vehicleService.getVehicleByCustomerId(customerId);
        return res.status(200).json(vehicle); 
    } catch (error) {
        next(error);
    }

}

// @ desc  Add a vehicle
// @route POST /api/vehicle
// @access Private

const addVehicle = async (req, res, next) => {
    try {
        //get vehicle data from the request body
        const vehicleData = req.body;

        //check if the vehicle data is empty
        if (!vehicleData || Object.keys(vehicleData).length === 0){
            return res.status(400).json({message: "Vehicle data is required"});
        }

        //validate the vehicle data
        const {error} = validateVehicle(vehicleData);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        //add vehicle
        const vehicle = await vehicleService.addVehicle(vehicleData);
        return res.status(200).json(vehicle); 
    } catch (error) {
        next(error);
    }
}

// @ desc  Update a vehicle
// @route PUT /api/vehicle/:id
// @access Private

const updateVehicle = async (req, res, next) => {
    try {
        //get vehicle data from the request body
        const vehicleData = req.body;
        //get vehicle id from the request parameters
        const vehicleId = req.params.id;

        //check if there is vehicle with the given id
        const vehicleExist = await vehicleService.getVehicleById(vehicleId);
        if (vehicleExist.message) {
            return res.status(404).json(vehicleExist);
        }
        
        //validate the vehicle data
        const {error} = validateVehicle(vehicleData);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        //update vehicle
        const vehicle = await vehicleService.updateVehicle(vehicleData, vehicleId);
        return res.status(200).json(vehicle); 
    } catch (error) {
        next(error);
    }
}

// @ desc  Delete a vehicle
// @route DELETE /api/vehicle/:id
// @access Private

const deleteVehicle = async (req, res, next) => {
    try {
        //get vehicle id from the request parameters
        const vehicleId = req.params.id;

        //check if there is vehicle with the given id
        const vehicleExist = await vehicleService.getVehicleById(vehicleId);
        if (vehicleExist.message) {
            return res.status(404).json(vehicleExist);
        }

        //delete vehicle
        const vehicle = await vehicleService.deleteVehicle(vehicleId);
        return res.status(200).json(vehicle); 
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getVehicleById,
    getVehicleByCustomerId,
    addVehicle,
    updateVehicle,
    deleteVehicle
}