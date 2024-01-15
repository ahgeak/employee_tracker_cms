const inquirer = require('inquirer');
const mysql = require('mysql2');
const { choices } = require('./lib/choices');
require('console.table');
const { viewDepartment, addDepartment } = require('./lib/department_queries');
const { viewRole, addRole } = require('./lib/role_queries');
const { viewEmployee, addEmployee, updateEmployee } = require('./lib/employee_queries');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'company_db'
});

// init will present the following options to the user to choose from: "View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"
function init() {
    inquirer.prompt(choices).then((answers) => {
    switch (answers.choices) {
        case "View all departments":
            // call view departments function
            viewDepartment(connection, init);
            break;
        case "View all roles":
            // call view roles function
            viewRole(connection, init);
            break;
        case "View all employees":
            // call view employees function
            viewEmployee(connection, init);
            break;
        case "Add a department":
            // call add department function
            addDepartment(connection, init);
            break;
        case "Add a role":
            // call add role function
            addRole(connection, init);
            break;
        case "Add an employee":
            // call add employee function
            addEmployee(connection, init);
            break;
        case "Update an employee role":
            // call add role function
            updateEmployee(connection, init);
            break;
        default:
            connection.end();
            break;
    }
    });
};

init();
