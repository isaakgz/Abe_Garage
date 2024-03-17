const db = require('../config/dbConfig');
const {hashPassword} = require("../utils/passwordUtils")


// =function to get all employees
const getEmployees = async () => {
    // sql query
    const sql = "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id;";

    //run the query
       const [rows] = await db.query(sql);
         return rows;
}

// function to get employee by id

const getSingleEmployee = async (id) =>{
    //sql query
    const sql = "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_id = ?;";
    //run the query
    const [rows] = await db.query(sql, [id]);
   
    //check if the employee exists with the given id
    if (rows.length > 0) {
        return rows;
    } else {
        return {message: "Employee not found with the given id"};
    }
}


// a function to check the employee is already in the database

const doesEmployeeExist = async (email) => {
    const sql = "SELECT * FROM employee WHERE employee_email = ?";
    const [rows] = await db.query(sql, [email]);
    //check if the employee exists
    return rows.length > 0 ? true : false;

}

//a function to create a new employee
const createEmployee = async (employeeData) => {

  let sql = "INSERT INTO employee (employee_email, employee_active_status) VALUES (? , ?)";
  const [rows] = await db.query(sql, [employeeData.email, employeeData.activeStatus]);

  //check if the data is inserted and if so, insert the employee info
  if (rows.affectedRows > 0) {


    //get the last inserted id
    const lastInsertedId = rows.insertId;
    
    //insert the employee info
    sql  = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const [rows1] = await db.query(sql, [lastInsertedId, employeeData.firstName, employeeData.lastName, employeeData.phoneNumber]);

    //insert the employee_pass

    const hashedPassword =await hashPassword(employeeData.password);
    sql  = "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const [rows2] = await db.query(sql, [lastInsertedId, hashedPassword]);

    //insert the employee role
    sql = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const [rows3] = await db.query(sql, [lastInsertedId, employeeData.roleId]);

    //return all inserted data
    return {employeeId: lastInsertedId, employeeData: employeeData};

    
  } else {
    return "Failed to insert employee data";

  }

}

// a function to update the employee
const updateEmployee = async (employeeData, employeeId) => {
    //sql query
    let sql = "UPDATE employee SET employee_email = ?, employee_active_status = ? WHERE employee_id = ?";
    const [rows] = await db.query(sql, [employeeData.email, employeeData.activeStatus, employeeId]);

    //check if the data is updated and if so, update the employee info
    if (rows.affectedRows > 0) {

        //update the employee info
        sql = "UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ?";
        const [rows1] = await db.query(sql, [employeeData.firstName, employeeData.lastName, employeeData.phoneNumber, employeeId]);

        //update the employee role
        sql = "UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?";
        const [rows2] = await db.query(sql, [employeeData.roleId, employeeId]);

        //return all updated data
        return {employeeId: employeeId, employeeData: employeeData};

    } else {
        return "Failed to update employee data";
    }

}

// a function to delete the employee
const deleteEmployee = async (id) => {
    //sql query
    const sql = "DELETE FROM employee WHERE employee_id = ?";
    const [rows] = await db.query(sql, [id]);
    
    //check if the employee is deleted and return the message
    if (rows.affectedRows > 0) {
        return {message: "Employee deleted successfully"}; ;
    } else {
        return  {message: "Failed to delete the employee"};
    }



}

//export the service
module.exports = {getEmployees, getSingleEmployee, doesEmployeeExist, createEmployee, updateEmployee, deleteEmployee}