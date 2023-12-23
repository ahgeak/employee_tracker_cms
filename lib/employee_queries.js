const inquirer = require("inquirer");

function viewEmployee(connection, cb) {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);
    cb();
  });
}

function getManagers (connection) {
    connection.query("SELECT * FROM employee", (err, results)=> {
      if (err) throw err;
      const managerArray = results.map((employee) => ({
        name: employee.first_name,
        value: employee.manager_id,
      }));
    //   console.log(managerArray);
      return managerArray;
    });
  }

function addEmployee(connection, cb) {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    const roleArray = results.map((role) => ({
      name: role.title,
      value: role.department_id,
    })); // make sure the key value is correct
    const managerArray = getManagers(connection);
    // const managerArray
    // const managerArray = results.map((employee) => ({
    //   name: employee.first_name,
    //   value: employee.manager_id,
    // })); // I am not sure if I can do this here
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "department_id",
            message: "What is the employee's role?",
            choices: roleArray // make sure this works
        },
        {
          type: "list",
          name: "department_id",
          message: "Who is the employee's mananger",
          choices: managerArray, // make sure this works
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO employee SET ?",
          answers,
          (err, results) => {
            if (err) throw err;
            // console.table(results);
            cb();
          }
        );
      });
  });
}

function updateEmployee(connection, cb) {
  // update employee record
}

module.exports = { viewEmployee, addEmployee, updateEmployee };
