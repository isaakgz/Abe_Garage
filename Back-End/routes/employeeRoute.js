const express = require('express');
const router = express.Router();
const {getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee} = require('../controllers/employeeController');
const {authMiddleware, adminMiddleware} = require("../middlewares/authMiddleware")


// Get all employees
router.get("/", authMiddleware, adminMiddleware,   getEmployees)

// Get employee by employee id
router.get("/:id", authMiddleware, adminMiddleware,getEmployeeById)

// Create new employee
router.post("/",authMiddleware, adminMiddleware, createEmployee)

// Update employee by id
router.put("/:id", authMiddleware, adminMiddleware,  updateEmployee)


// Delete employee by id
router.delete("/:id", authMiddleware, adminMiddleware, deleteEmployee )


module.exports = router;