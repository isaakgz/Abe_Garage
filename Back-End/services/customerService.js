const db = require("../config/dbConfig");
const generateHash = require("../utils/hashcustomer");


// a function to get all customers

const getCustomers = async () => {
    //sql query
    let sql = "SELECT ci.customer_id, ci.customer_email, ci.customer_phone_number,customer_added_date,customer_hash, cinfo.customer_first_name, cinfo.customer_last_name,customer_active_status FROM customer_identifier ci INNER JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id"

    const [rows] = await db.query(sql)
    return rows;
};


// a function to get single customer

const getCustomer = async (id) => {

    //sql query to select single customer form database
    let sql = "SELECT ci.customer_id, ci.customer_email, ci.customer_phone_number,ci.customer_added_date,ci.customer_hash, cinfo.customer_first_name, cinfo.customer_last_name,customer_active_status FROM customer_identifier ci INNER JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id WHERE ci.customer_id = ?";

    //run the query
    const [rows] = await db.query(sql, [id]);
    //check if the customer exists with the given id
    if (rows.length > 0) {
        return rows;
    } else {
        return {message:"customer not found with the given id"}
    }

}

//a function to check if the customer is already in database
const doesCustomerExist = async (email, phoneNumber) => {
    let sql = "SELECT * FROM customer_identifier WHERE customer_email = ? OR customer_phone_number = ?";
    const [rows] = await db.query(sql, [email, phoneNumber]);
    return rows.length > 0 ? true : false;
}

// a function to add a customer
const addCustomer = async (customerData) => {

    //generate a customer hash
    const hashedCustomer = generateHash(customerData.email);

    //add to database (customer_identifier)
    let sql = 'INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)';
    const [rows] =await db.query(sql, [customerData.email, customerData.phoneNumber, hashedCustomer]);

    ////check if the data is inserted and if so, insert the customer_info
    if (rows.affectedRows > 0){
        //get the last inserted id
        const lastInsertedId = rows.insertId;
        //insert the employee info
        sql = "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, customer_active_status) VALUES (?, ?, ?, ?)";

        const [rows2] = await db.query(sql, [lastInsertedId, customerData.firstName, customerData.lastName, customerData.activeStatus]);
        return {customerId:lastInsertedId, customer:customerData}
    } else {
        return "Failed to insert customer data"
    }
}

//function to update the customer data

const updateCustomer = async (customerData, customerId) => {
    let sql = 'UPDATE  customer_identifier SET customer_email = ?, customer_phone_number = ? WHERE customer_id = ?';
    const [rows] =await db.query(sql, [customerData.email, customerData.phoneNumber, customerId] );

    ////check if the data is updated and if so, update the customer_info
    if (rows.affectedRows > 0){
        
        //update the employee info
        sql = "UPDATE  customer_info SET  customer_first_name = ?, customer_last_name = ?, customer_active_status = ? WHERE customer_id = ?";

        const [rows2] = await db.query(sql, [customerData.firstName, customerData.lastName, customerData.activeStatus, customerId]);
        //return the response
        return {customerId:customerId, customer:customerData}
    } else {
        return "Failed to update customer data"
    }
}

// a function to delete a customer 
const deleteCustomer = async (customerId) => {
     //sql query
     const sql = "DELETE FROM customer_identifier WHERE customer_id = ?";
     const [rows] = await db.query(sql, [customerId]);
     
     //check if the employee is deleted and return the message
     if (rows.affectedRows > 0) {
         return {message: "Customer deleted successfully"}; ;
     } else {
         return  {message: "Failed to delete the employee"};
     }
}

//export customer services
module.exports = {getCustomers, getCustomer, doesCustomerExist, addCustomer, updateCustomer, deleteCustomer}