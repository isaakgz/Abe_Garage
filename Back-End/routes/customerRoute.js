const express = require("express");
const router = express.Router();
const {getCustomers, getCustomer, addCustomer ,updateCustomer, deleteCustomer} = require("../controllers/customerController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");


//get all customer
router.get("/", authMiddleware, adminMiddleware, getCustomers)


//get a customer
router.get("/:id", authMiddleware, adminMiddleware, getCustomer);


//add a customer
router.post("/", authMiddleware, adminMiddleware, addCustomer)

//update a customer
router.put("/:id", authMiddleware, adminMiddleware, updateCustomer)

//delete a customer
router.delete("/:id", authMiddleware, adminMiddleware, deleteCustomer)




//export the module
module.exports = router;