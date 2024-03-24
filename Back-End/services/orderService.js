const db = require("../config/dbConfig");
const generateOrderHash = require("../utils/hashCustomer");




// a function to get all orders
const getOrders = async () => {
    try {
        let sql  = "SELECT o.order_id, o.customer_id, o.employee_id, o.vehicle_id, o.order_date, o.order_hash,o.order_description, oi.order_total_price, oi.order_estimated_completion_date,oi.order_completion_date, oi.order_additional_requests,oi.order_additional_requests_completed,os.service_id , ost.order_status FROM orders o INNER JOIN order_info oi ON o.order_id = oi.order_id INNER JOIN order_services os ON o.order_id = os.order_id INNER JOIN order_status ost ON o.order_id = ost.order_id";    
        
        const [rows] = await db.query(sql);
        return rows;
        
    } catch (error) {
        throw error;
    }
}

// a function to get single order
const getOrder = async (id) => {
    try {
        let sql = "SELECT o.order_id, o.customer_id, o.employee_id, o.vehicle_id, o.order_date, o.order_hash,o.order_description, oi.order_total_price, oi.order_estimated_completion_date,oi.order_completion_date, oi.order_additional_requests,oi.order_additional_requests_completed,os.service_id , ost.order_status FROM orders o INNER JOIN order_info oi ON o.order_id = oi.order_id INNER JOIN order_services os ON o.order_id = os.order_id INNER JOIN order_status ost ON o.order_id = ost.order_id WHERE o.order_id = ?";
        const [rows] = await db.query(sql, [id]);
        if (rows.length > 0) {
            return rows;
        } else {
            return {message:"order not found with the given id"}
        }
    } catch (error) {
        throw error;
    }
}

// a function to to get orders by customer id
const getOrdersByCustomerId = async (id) => {
    try {
        // SQL query to select orders based on customer id
        let sql = "SELECT o.order_id, o.customer_id, o.employee_id, o.vehicle_id, o.order_date, o.order_hash,o.order_description, oi.order_total_price, oi.order_estimated_completion_date,oi.order_completion_date, oi.order_additional_requests,oi.order_additional_requests_completed,os.service_id , ost.order_status FROM orders o INNER JOIN order_info oi ON o.order_id = oi.order_id INNER JOIN order_services os ON o.order_id = os.order_id INNER JOIN order_status ost ON o.order_id = ost.order_id WHERE o.customer_id = ?";
        const [rows] = await db.query(sql, [id]);
        if (rows.length > 0) {
            return rows;
        } else {
            return {message:"order not found with the given customer id"}
        }
    } catch (error) {
        throw error;
    }
}

// a function to add an order
const addOrder = async (orderData) => {
    try {

        //sql query to insert order
        let sql = 'INSERT INTO orders (customer_id, employee_id, vehicle_id,  order_hash, order_description) VALUES (?, ?, ?, ?, ?)';

        //hash the order
        const orderHash = generateOrderHash(orderData.customerId);

        //run the query
        const [rows] = await db.query(sql, [orderData.customerId, orderData.employeeId, orderData.vehicleId,  orderHash, orderData.orderDescription]);

        //check if the data is inserted and if so, insert the order_info, order_services and order_status
        if (rows.affectedRows > 0){
            //get the last inserted id
            const lastInsertedId = rows.insertId;

            sql = "INSERT INTO order_info (order_id, order_total_price, order_estimated_completion_date, order_completion_date, order_additional_requests, order_additional_requests_completed) VALUES (?, ?, ?, ?, ?, ?)";

            const [rows2] = await db.query(sql, [lastInsertedId, orderData.orderTotalPrice, orderData.orderEstimatedCompletionDate, orderData.orderCompletionDate, orderData.orderAdditionalRequests, orderData.orderAdditionalRequestsCompleted]);

            sql = "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";
            const [rows3] = await db.query(sql, [lastInsertedId, orderData.serviceId, orderData.serviceCompleted]);

            sql = "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
            const [rows4] = await db.query(sql, [lastInsertedId, orderData.orderStatus]);
            return {orderId:lastInsertedId, order:orderData}
        } else {
            return {message:"order not added"}
        }
    } catch (error) {
        throw error;
    }
}



// a function to update an order
const updateOrder = async (id, orderData) => {
    try {
        //  SQL query to update order
        let sql = "UPDATE orders SET customer_id = ?, employee_id = ?, vehicle_id = ?, order_description WHERE order_id = ?";

        const [rows] = await db.query(sql, [orderData.customerId, orderData.employeeId, orderData.vehicleId,  orderData.order_description, id]);
        if (rows.affectedRows > 0){
            sql = "UPDATE order_info SET order_total_price = ?, order_estimated_completion_date = ?, order_completion_date = ?, order_additional_requests = ?, order_additional_requests_completed = ? WHERE order_id = ?";

            //run the query
            const [rows2] = await db.query(sql, [orderData.orderTotalPrice, orderData.orderEstimatedCompletionDate, orderData.orderCompletionDate, orderData.orderAdditionalRequests, orderData.orderAdditionalRequestsCompleted, id]);

            //update the order_services
            sql = "UPDATE order_services SET service_id = ? WHERE order_id = ?";
            const [rows3] = await db.query(sql, [orderData.serviceId, id]);

            //update the order_status
            sql = "UPDATE order_status SET order_status = ? WHERE order_id = ?";
            const [rows4] = await db.query(sql, [orderData.orderStatus, id]);

            //return the response
            return {orderId:id, order:orderData}
        } else {
            return {message:"order not updated"}
        }
    } catch (error) {
        throw error;
    }
}

// a function to delete an order
const deleteOrder = async (id) => {
    try {
        let sql = "DELETE FROM orders WHERE order_id = ?";
        const [rows] = await db.query(sql, [id]);
        if (rows.affectedRows > 0){
            return {message:"order deleted"}
        } else {
            return {message:"order not deleted"}
        }
    } catch (error) {
        throw error;
    }
}

//export order services
module.exports = {
    getOrders,
    getOrder,
    getOrdersByCustomerId,
    addOrder,
    updateOrder,
    deleteOrder
}