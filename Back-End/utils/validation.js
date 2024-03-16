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


module.exports = validateEmployee;