const employeeService   = require("../services/employeeService")
const validateEmployee = require("../utils/validation")


// @desc    Get all employees
// @route   GET /api/employee
// @access  private
const getEmployees = async (req, res, next) => {
    try {
       const employees = await employeeService.getEmployees();
       res.status(200).json(employees);
    } catch (error) {
      
       return next(error);
    }

}

// @desc    Get single employee by id
// @route   GET /api/employee/:id
// @access  private

const getEmployeeById = async (req, res, next) => {

   // get the id from the request params
   const employeeId = req.params.id;

    try {
      //
      const employee = await employeeService.getSingleEmployee(employeeId)
      res.status(200).json(employee);

    } catch (error) {
      // pass the error to the error handler middleware
      return next(error);
      
    }
}

// @desc    create new employee
// @route   POST /api/employee
// @access  private

const createEmployee = async (req, res, next) => {
      const  employeeData = req.body;

      // check if the request body is empty
      if (!employeeData || Object.keys(employeeData).length === 0) {
        return res.status(400).json({message: "Request body cannot be empty"})
      };

      //check if the request body contains the valid data
      const  {error} = validateEmployee(employeeData);
      if (error) {
         return res.status(400).json({message: error.details[0].message.replace(/['"]+/g, '')})
      }

      //check if the employee is already in the database
      const employeeExists = await employeeService.doesEmployeeExist(employeeData.email);
      if (employeeExists) {
         return res.status(400).json({message: "Employee already exists"})
      }

      //create the employee
      try {
         const employee = await employeeService.createEmployee(employeeData)
         res.status(201).json(employee);
         
      } catch (error) {
         // pass the error to the error handler middleware
         return next(error);
      }

   
}

 

module.exports = {getEmployees, getEmployeeById, createEmployee}