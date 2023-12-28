const inquirer = require('inquirer');

function viewRole(connection, cb) {
    connection.query("SELECT * FROM role", (err, results)=> {
        if (err) throw err;
        console.table(results);
        cb();
    })
};

function addRole(connection, cb) {
    connection.query("SELECT * FROM department", (err, results)=> {
        if (err) throw err;
        const dptArray = results.map(dpt => ({name: dpt.name, value: dpt.id}))
        inquirer.prompt([
            {
                type: "list",
                name: "department_id",
                message: "Which department is this role in?",
                choices: dptArray
            },
            {
                type: "input",
                name: "title",
                message: "What is the title for this role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?"
            },
        ]).then((answers) => {
            connection.query("INSERT INTO role SET ?", answers, (err, results) => {
                if (err) throw err;
                // console.table(results);
                cb();
            })
        });
    })
};

module.exports = { viewRole, addRole }
