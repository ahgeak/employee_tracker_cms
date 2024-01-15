const inquirer = require('inquirer');
const { addDptQuestions } = require('./choices');

// viewDepartment displays all information from department table to the console
function viewDepartment(connection, cb) {
    connection.query("SELECT * FROM department", (err, results)=> {
        if (err) throw err;
        console.table(results);
        cb();
    })
};

// addDepartment uses inquirer to prompt the user with the questions needed to add the department
function addDepartment(connection, cb) {
    inquirer.prompt(addDptQuestions).then((answers) => {
        connection.query("INSERT INTO department SET ?", answers, (err, results)=> {
            if (err) throw err;
            cb();
        })
    });
};

module.exports = { viewDepartment, addDepartment }
