const db = require("../config/dbConfig");



// a function to get vehicle by id
const getVehicleById = async (id) => {
    try {
        // get vehicle by id from the database
        const [rows] = await db.query("SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?", [id]);

        //check if vehicle exists with the given id
        if (rows.length > 0) {
            return rows;
        } else {
            return {message: "Vehicle not found with the given id"}
        }
    } catch (error) {
       throw Error(error);
    }
};

// a function to get vehicle by customer id
const getVehicleByCustomerId = async (customerId) => {
    try {
        // get vehicle by customer id from the database
        const [rows] = await db.query("SELECT * FROM customer_vehicle_info WHERE customer_id = ?", [customerId]);

        //check if vehicle exists with the given customer id
        if (rows.length > 0) {
            return rows
        } else {
            return {message:"Vehicle not found with the given customer id"}
        }
    } catch (error) {
        throw Error(error);
    }
};

// a function to add a vehicle
const addVehicle = async (vehicleData) => {
    try {
        let sql = "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial_number, vehicle_color) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?)";
        
        // add vehicle to the database
        const [rows] = await db.query(sql, [vehicleData.customer_id, vehicleData.vehicle_year, vehicleData.vehicle_make, vehicleData.vehicle_model, vehicleData.vehicle_type, vehicleData.vehicle_mileage, vehicleData.vehicle_tag, vehicleData.vehicle_serial_number, vehicleData.vehicle_color]);

        // check if vehicle is added successfully
        if (rows.affectedRows === 0) {
            return {
                message: "Vehicle not added"}
        } else {
            return {message: "Vehicle added successfully", vehicleData};
        }
    } catch (error) {
        throw Error(error);
    }
};

// a function to update a vehicle
const updateVehicle = async (vehicleData, id) => {
    try {
        let sql = "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial_number = ?, vehicle_color = ? WHERE vehicle_id = ?";
        
        // update vehicle in the database
        const [rows] = await db.query(sql, [vehicleData.vehicle_year, vehicleData.vehicle_make, vehicleData.vehicle_model, vehicleData.vehicle_type, vehicleData.vehicle_mileage, vehicleData.vehicle_tag, vehicleData.vehicle_serial_number, vehicleData.vehicle_color, id]);

        // check if vehicle is updated successfully
        if (rows.affectedRows === 0) {
            return {
                message: "Vehicle not updated"}
        } else {
            return {message: "Vehicle updated successfully", vehicleData};
        }
    } catch (error) {
        throw Error(error);
    }
};

// a function to delete a vehicle
const deleteVehicle = async (id) => {
    try {
        // delete vehicle from the database
        const [rows] = await db.query("DELETE FROM customer_vehicle_info WHERE vehicle_id = ?", [id]);

        // check if vehicle is deleted successfully
        if (rows.affectedRows === 0) {
            return {
                message: "Vehicle not deleted"}
        } else {
            return {message: "Vehicle deleted successfully"};
        }
    } catch (error) {
        throw Error(error);
    }
};

module.exports = {
    getVehicleById,
    getVehicleByCustomerId,
    addVehicle,
    updateVehicle,
    deleteVehicle
};