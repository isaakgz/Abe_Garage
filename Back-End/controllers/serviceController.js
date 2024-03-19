const serviceServices = require("../services/serviceService");
const {validateService} = require("../utils/validation");

// @desc    Get all services
// @route   GET /api/services
// @access  public

const getServices = async (req, res, next) => {
    try {
        const services = await serviceServices.getServices();
        //check if there are no services in the database
        if (services.length === 0) {
            return res.status(404).json({message: "No services found"});
        } else{
            res.status(200).json(services);
        }
    } catch (error) {
        return next(error);
    }
}

// @desc    Get a service
// @route   GET /api/services/:id
// @access  public
const getService = async (req, res, next) => {
    try {
        const serviceId = req.params.id;
        const service = await serviceServices.getService(serviceId);
        //send the response
        res.status(200).json(service);
      
    } catch (error) {
        return next(error); 
    }
}


// @desc    Add a service
// @route   POST /api/services
// @access  private
const addService = async (req, res, next) => {
    try {
        const {serviceName, serviceDescription} = req.body;
        //check if the service name and description are provided
        if (!serviceName || !serviceDescription) {
            return res.status(400).json({message: "Service name and description are required"});
        }

        //create the service data
        const serviceData = {
            serviceName,
            serviceDescription
        }

        //validate the data
        const {error} = validateService(serviceData);
        if (error) {
            return res.status(400).json({message: error.details[0].message.replace(/['"]+/g, '')});
        }

        //add the service
        const service = await serviceServices.addService(serviceData);
        //send the response
        return res.status(201).json({message: "Service added successfully", service: service});
    } catch (error) {
        return next(error);
        
    }
}


// @desc    Update a service
// @route   PUT /api/services/:id
// @access  private
const updateService =async (req, res, next) => {
    try {
        const serviceId = req.params.id;
        //check if there is user with this id
        const serviceExist =  await serviceServices.getService(serviceId);
        if (serviceExist.message) {
            return res.status(404).json(serviceExist);
        } 

        //get the service data from the request body
        const serviceData = req.body;
        //validate the service data
        const {error} = validateService(serviceData);
        if (error) {
            return res.status(400).json({message: error.details[0].message.replace(/['"]+/g, '')});
        }

        //update the service
        const service = await serviceServices.updateService(serviceData, serviceId);
        //send the response
        return res.status(200).json({message: "Service updated successfully", service: service});

        
    } catch (error) {
        return next(error);  
    }

}

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  private
const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;

        //check if there is service with this id
        const serviceExist = await serviceServices.getService(serviceId);
        if (serviceExist.message) {
            return res.status(404).json(serviceExist);
        }

        //delete the service
        const service =await serviceServices.deleteService(serviceId);
        //send the response
        return res.status(200).json({message: "Service deleted successfully"});

    } catch (error) {
        return next(error);
        
    }
}

module.exports = {getServices, getService, addService, updateService, deleteService}

