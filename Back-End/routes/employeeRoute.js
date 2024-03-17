const express = require('express');
const router = express.Router();
const {getEmployees, getEmployeeById, createEmployee, updateEmployee} = require('../controllers/employeeController');


// Get all employees
router.get("/", getEmployees)

// Get employee by employee id
router.get("/:id",getEmployeeById)

// Create new employee
router.post("/", createEmployee)

// Update employee by id
router.put("/:id", updateEmployee)


// Delete employee by id
router.delete("/:id", (req, res) => {
    res.send("Delete employee by id");
})


module.exports = router;