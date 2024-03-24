const db = require("../config/dbConfig");
const customerServices = require("../services/customerService")
const {validateCustomer} = require("../utils/validation")


// @desc    get customers
// @route   GET /api/customers
// @access  private

const getCustomers = async (req, res, next) => {
    try {
        const customers = await customerServices.getCustomers();
        res.status(200).json({customers:customers});
    
    } catch (error) {
         // pass the error to the error handler middleware
       next(error)
    }
}

// @desc    get customer
// @route   GET /api/customers/:id
// @access  private

const getCustomer =async (req, res, next) => {
    try {
        //get a customer id from request parameter
      const customerId = req.params.id;
      
      const customer = await customerServices.getCustomer(customerId);
      res.status(200).json(customer)

    } catch (error) {
        // pass the error to the error handler middleware
       next(error)
    }
}

// @desc    add a  customer
// @route   POST /api/customers
// @access  private
const addCustomer = async (req, res, next) => {
    try {
        const customerData = req.body;
        // check if the request body is empty
        if (!customerData || Object.keys(customerData).length ===0) {
            return res.status(400).json({message: "Request body cannot be empty"})
        }
        
        //check if the request body contains the valid data
        const {error} = validateCustomer(customerData);
        if (error) {
            return res.status(400).json({message: error.details[0].message.replace(/['"]+/g, '')})
        }

        //check if the customer is already in the database
        const CustomerExists =  await  customerServices.doesCustomerExist(customerData.email, customerData.phoneNumber);
        if (CustomerExists) {
            return res.status(400).json({message: "email or phone number already in use change it and try again"})
        }

        //add a customer
        const customer = await customerServices.addCustomer(customerData);
        res.status(201).json({message: "customer added successfully", customer});
        
    } catch (error) {
        next(error)
        
    }
}


// @desc    update a  customer
// @route   PUT /api/customers
// @access  private
const updateCustomer = async (req, res, next) => {

try {
    //get an id from request Parameter
    const customerId = req.params.id;

    //check if there is customer with the given id
    const customerExists = await customerServices.getCustomer(customerId);
    if (customerExists.message) {
       return res.status(404).json(customerExists.message)
    }

        // get the employee data from the request body
    const customerData = req.body; 
    
    //update the data
    const updatedCustomer = await customerServices.updateCustomer(customerData, customerId);
    return res.status(200).json({message: "customer updated successfully", updatedCustomer});

} catch (error) {
    next(error)  
}

}


// @desc    delete employee
// @route   DELETE /api/employee/:id
// @access  private

const deleteCustomer =async (req, res, next) => {
    try {
        // get the id from the request params and check if the employee exists with the given id
    const customerId = req.params.id;

     //check if there is customer with the given id
     const customerExists = await customerServices.getCustomer(customerId);
     if (customerExists.message) {
        return res.status(404).json(customerExists.message)
     }

     //delete the customer
     const deletedCustomer = await customerServices.deleteCustomer(customerId);
     return res.status(201).json(deletedCustomer)

    } catch (error) {
        next(error)
    }
    
}

module.exports = {getCustomers, getCustomer, addCustomer, addCustomer, updateCustomer,    deleteCustomer}