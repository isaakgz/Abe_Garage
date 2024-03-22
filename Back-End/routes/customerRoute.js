const express = require("express");
const router = express.Router();
const {getCustomers, getCustomer, addCustomer ,updateCustomer, deleteCustomer} = require("../controllers/customerController")


//get all customer
router.get("/", getCustomers)


//get a customer
router.get("/:id", getCustomer);


//add a customer
router.post("/", addCustomer)

//update a customer
router.put("/:id", updateCustomer)

//delete a customer
router.delete("/:id", deleteCustomer)




//export the module
module.exports = router;