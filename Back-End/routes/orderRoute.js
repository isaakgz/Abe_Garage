const express = require("express");
const router = express.Router();
const {addOrder,deleteOrder, getOrder, getOrders,getOrdersByCustomerId, updateOrder} = require("../controllers/orderController");



//get all orders
router.get("/", getOrders)


//get a single order by id
router.get("/:id", getOrder)

//get orders by customer id
router.get("/", getOrdersByCustomerId)


//add an order
router.post("/", addOrder)


//update a an order
router.put("/:id", updateOrder)

//delete an order
router.delete("/:id", deleteOrder)



module.exports = router