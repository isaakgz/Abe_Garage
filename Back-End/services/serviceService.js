const db = require('../config/dbConfig');
const {validateService} = require("../utils/validation");


//a function to get all services
const getServices = async () => {
    //get all services from the database
   const [rows] = await db.query("SELECT * FROM common_services");
   return rows;
}

//a function to get a service
const getService = async (id) => {
    //get a service from the database
    const [rows] = await db.query('SELECT * FROM common_services WHERE service_id = ?', [id]); 

    //check if the service exists
    if (rows.length > 0) {
        return rows;
    } else {
        return {message: "Service not found with the given id"};
    }
   
}

// a function to add a service
const addService = async (serviceData) => {
//add a service to the database
let sql = " INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
const [rows] = await db.query(sql, [serviceData.serviceName, serviceData.serviceDescription]);
//check if the service has been added
if (rows.affectedRows === 0) {
    return {message: "Service not added"};
} else {
    return {serviceId: rows.insertId, serviceData: serviceData};
}

}


// a function to update a service
const updateService = async (serviceData, id) => {
    //update a service in the database
    let sql = "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?";
    const [rows] = await db.query(sql, [serviceData.serviceName, serviceData.serviceDescription, id]);

    //check if the service has been updated
    if (rows.affectedRows ===0) {
        return {message: "Service not updated"};
    } else {
        return {serviceId: id, serviceData: serviceData};
    
    }
}

// a function to delete a service
const deleteService = async (id) =>{
    //delete a service from the database
    let sql = "DELETE FROM common_services WHERE service_id = ?";
    const [rows] = await db.query(sql, [id]);

    //check if the service has been deleted
    if (rows.affectedRows === 0) {
        return {message: "Service not deleted"};
    } else {
        return {message: "Service deleted"};
    }

}

module.exports = {getServices, getService, addService, updateService, deleteService}
