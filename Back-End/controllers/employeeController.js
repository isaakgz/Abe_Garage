const db = require('../config/dbConfig');
const employeeService   = require("../services/employeeService")




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

module.exports = {getEmployees}