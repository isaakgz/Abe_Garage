const express = require("express");
const router = express.Router();



//get all orders
router.get("/", (req, res) => {
    res.send("get all user")
})


//get a single order
router.get("/:id", (req, res) => {
    res.send("get a single order")
})


//add an order
router.post("/", (req, res) => {
    res.send("add an order")
})


//update a an order
router.put("/:id", (req, res) => {
    res.send("update a order")
})

//delete an order
router.delete("/:id", (req, res) => {
    res.send("delete a order")
})



module.exports = router