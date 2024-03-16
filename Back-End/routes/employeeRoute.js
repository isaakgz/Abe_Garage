const express = require('express');
const router = express.Router();


// Get all employees
router.get("/", (req, res)=>{
    res.send("Get all employees");
})

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