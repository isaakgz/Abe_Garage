const Joi = require('joi');



//a function to validate the employee data

const validateEmployee = (employeeData) => {
    
    //define the schema
    const schema = Joi.object({
        email: Joi.string().email().required(),
        activeStatus: Joi.number().required(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        phoneNumber: Joi.string().min(10).required(),
        password: Joi.string().min(6).required(),
        roleId: Joi.number().required()
    });
    //return the validation result
    return schema.validate(employeeData);

}

const validateService = (serviceData) => {
    //define the schema
    const schema = Joi.object({
        serviceName: Joi.string().min(5).required(),
        serviceDescription: Joi.string().min(30).required()
    });
    //return the validation result
    return schema.validate(serviceData);
}

const validateCustomer  = (customerData) => {
    //define the schema
    const schema = Joi.object({
        email:Joi.string().email().required(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        phoneNumber: Joi.string().min(10).required(),
        activeStatus: Joi.number().required(),
    })

    //return the validation result
    return schema.validate(customerData)

}

const validateVehicle = (vehicleData) => {
const schema = Joi.object({
    customer_id: Joi.number().integer().required(),
    vehicle_year: Joi.number().integer().min(1886).max(new Date().getFullYear()),
    vehicle_make: Joi.string().required(),
    vehicle_model: Joi.string().required(),
    vehicle_type: Joi.string().required(),
    vehicle_mileage: Joi.number().integer().min(0),
    vehicle_tag: Joi.string().required(),
    vehicle_serial_number: Joi.string().required(),
    vehicle_color: Joi.string().required()
  })
  return schema.validate(vehicleData)};
module.exports = {validateEmployee, validateService,  validateCustomer, validateVehicle};