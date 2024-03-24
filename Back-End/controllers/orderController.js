const orderServices = require("../services/orderService");



// @ desc Get all orders
// @ route GET /api/orders
// @ access private

const getOrders = async (req, res, next) => {
    try {
        // get all orders
        const orders = await orderServices.getOrders();
        res.status(200).json(orders);
    } catch (error) {

        //pass the error to the error handler middleware
        next(error); 
    }
}

// @ desc Get single order by id
// @ route GET /api/orders/:id
// @ access Private

const getOrder = async (req, res, next) => {
    try {
        //get the order id from the request parameters
        const orderId = req.params.id;

        //get the order
        const order = await orderServices.getOrder(orderId);
        res.status(200).json(order);
    } catch (error) {
        //pass the error to the error handler middleware
        next(error);
        
    }
}

// @ desc Get orders by customer id
// @ route GET /api/orders/customer/:id
// @ access Private

const getOrdersByCustomerId = async (req, res, next) => {
    try {
        //get the customer id from the request parameters
        const customerId = req.query.id;

        //get orders by customer id
        const orders = await orderServices.getOrdersByCustomerId(customerId);
        res.status(200).json(orders);
    } catch (error) {
        //pass the error to the error handler middleware
        next(error);
    }
}

// @ desc Add an order
// @ route POST /api/orders
// @ access Private

const addOrder = async (req, res, next) => {
    try {
        //get the order data from the request body
        const orderData = req.body;

        //check if the required data is provided
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Please provide order data" });
        }

        //add the order
        const order = await orderServices.addOrder(orderData);  
        res.status(200).json(order);

       
    } catch (error) {
        //pass the error to the error handler middleware
        next(error);
    }
}

// @ desc Update an order
// @ route PUT /api/orders/:id
// @ access Private

const updateOrder = async (req, res, next) => {
    try {
        //get the order id from the request parameters
        const orderId = req.params.id;

        //get the order data from the request body
        const orderData = req.body;

        //check if the required data is provided
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "Please provide order data" });
        }

        //check if the order exists
        const orderExist = await orderServices.getOrder(orderId);
        if (orderExist.message) {
            return res.status(404).json({message:orderExist.message});
        }

        //update the order
        const order = await orderServices.updateOrder(orderId, orderData);
        res.status(200).json(order);
    } catch (error) {
        //pass the error to the error handler middleware
        next(error);
    }
}

// @ desc Delete an order
// @ route DELETE /api/orders/:id
// @ access Private

const deleteOrder = async (req, res, next) => {
    try {
        //get the order id from the request parameters
        const orderId = req.params.id;

        //check if the order exists
        const orderExist = await orderServices.getOrder(orderId);
        if (orderExist.message) {
            return res.status(404).json({message:orderExist.message});
        }

        //delete the order
        const order = await orderServices.deleteOrder(orderId);
        res.status(200).json(order);
    } catch (error) {
        //pass the error to the error handler middleware
        next(error);
    }
}


module.exports = {
    getOrders,
    getOrder,
    getOrdersByCustomerId,
    addOrder,
    updateOrder,
    deleteOrder
}