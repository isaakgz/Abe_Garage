const db = require('../config/dbConfig');


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
    return rows;
}



//export the service
module.exports = {getEmployees, getSingleEmployee}