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

module.exports = {getEmployees, getEmployeeById}