const express = require('express');
const router = express.Router();
const {getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee} = require('../controllers/employeeController');
const {authMiddleware, adminMiddleware} = require("../middlewares/authMiddleware")


// Get all employees
router.get("/",   getEmployees)

// Get employee by employee id
router.get("/:id",getEmployeeById)

// Create new employee
router.post("/", createEmployee)

// Update employee by id
router.put("/:id",  updateEmployee)


// Delete employee by id
router.delete("/:id",deleteEmployee )


module.exports = router;