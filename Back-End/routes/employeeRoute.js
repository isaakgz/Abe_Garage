const express = require('express');
const router = express.Router();
const {getEmployees} = require('../controllers/employeeController');


// Get all employees
router.get("/", getEmployees)

// Get employee by id
router.get("/:id", (req, res) => {
    res.send("Get employee by id");
})

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