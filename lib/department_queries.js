const inquirer = require('inquirer');
const { addDptQuestions } = require('./choices');

function viewDepartment(connection, cb) {
    connection.query("SELECT * FROM department", (err, results)=> {
        if (err) throw err;
        console.table(results);
        cb();
    })
};

function addDepartment(connection, cb) {
    inquirer.prompt(addDptQuestions).then((answers) => {
        connection.query("INSERT INTO department SET ?", answers, (err, results)=> {
            if (err) throw err;
            cb();
        })
    });
};

module.exports = { viewDepartment, addDepartment }
