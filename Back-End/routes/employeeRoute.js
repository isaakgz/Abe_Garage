const express = require('express');
const router = express.Router();
const {getEmployees, getEmployeeById} = require('../controllers/employeeController');


// Get all employees
router.get("/", getEmployees)

// Get employee by employee id
router.get("/:id",getEmployeeById)

// Create new employee
router.post("/", (req, res) => {
    res.send("Create new employee");
})

// Update employee by id
router.put("/:id", (req, res) => {
    res.send("Update employee by id");
})


// Delete employee by id
router.delete("/:id", (req, res) => {
    res.send("Delete employee by id");
})


module.exports = router;