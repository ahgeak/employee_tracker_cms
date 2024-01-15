const inquirer = require("inquirer");

// function viewEmployee(connection, cb) {
//   connection.query("SELECT * FROM employee", (err, results) => {
//     if (err) throw err;
//     console.table(results);
//     cb();
//   });
// };

// updated this to add the info from both employee table and role table
function viewEmployee(connection, cb) {
  connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id=role.id", (err, results) => {
    if (err) throw err;
    console.table(results);
    cb();
  });
};

// getManagers uses a promise to ensure that the managerArray is resolved before inquirer needs the array in add Employee function
function getManagers(connection) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employee", (err, results) => {
      if (err) {
        reject(err);
      } else {
        const managerArray = results.map((employee) => ({
          name: employee.first_name + " " + employee.last_name,
          value: employee.manager_id,
        }));
        resolve(managerArray);
      }
    });
  });
}

function addEmployee(connection, cb) {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    const roleArray = results.map((role) => ({
      name: role.title,
      value: role.department_id,
    }));

    getManagers(connection)
      .then((managerArray) => {
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
              name: "role_id",
              message: "What is the employee's role?",
              choices: roleArray,
            },
            {
              type: "list",
              name: "manager_id",
              message: "Who is the employee's manager?",
              choices: managerArray,
            },
          ])
          .then((answers) => {
            connection.query(
              "INSERT INTO employee SET ?",
              answers,
              (err, results) => {
                if (err) throw err;
                cb();
              }
            );
          });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });
}

// This is not working, it is calling the addEmployee function before the array is created in getManagers function
// function getManagers (connection) {
//     connection.query("SELECT * FROM employee", (err, results)=> {
//       if (err) throw err;
//       const managerArray = results.map((employee) => ({
//         name: employee.first_name,
//         value: employee.manager_id,
//       }));
//     //   console.log(managerArray);
//       return managerArray;
//     });
//   }

// function addEmployee(connection, cb) {
//   connection.query("SELECT * FROM role", (err, results) => {
//     if (err) throw err;
//     const roleArray = results.map((role) => ({
//       name: role.title,
//       value: role.department_id,
//     })); // make sure the key value is correct
//     const managerArray = getManagers(connection);
//     // const managerArray
//     // const managerArray = results.map((employee) => ({
//     //   name: employee.first_name,
//     //   value: employee.manager_id,
//     // })); // I am not sure if I can do this here
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "first_name",
//           message: "What is the employee's first name?",
//         },
//         {
//           type: "input",
//           name: "last_name",
//           message: "What is the employee's last name?",
//         },
//         {
//             type: "list",
//             name: "role_id",
//             message: "What is the employee's role?",
//             choices: roleArray // make sure this works
//         },
//         {
//           type: "list",
//           name: "department_id",
//           message: "Who is the employee's mananger",
//           choices: managerArray, // make sure this works
//         },
//       ])
//       .then((answers) => {
//         connection.query(
//           "INSERT INTO employee SET ?",
//           answers,
//           (err, results) => {
//             if (err) throw err;
//             // console.table(results);
//             cb();
//           }
//         );
//       });
//   });
// }

function getRole(connection) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM role", (err, results) => {
      if (err) {
        reject(err);
      } else {
        const roleArr = results.map((role) => ({
          name: role.title,
          value: role.id,
        }));
        resolve(roleArr);
      }
    });
  });
}

// I AM WORKING ON THIS ONE, NEED TO CHECK TO SEE IF IT FUNCTIONS PROPPERLY!!
function updateEmployee(connection, cb) {
  // update employee record
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    const employeeArr = results.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));
    getRole(connection).then((roleArr) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: "Which employee's role do you want to update?",
            choices: employeeArr,
          },
          {
            type: "list",
            name: "role_id",
            message:
              "What role do you want to assign to the selected employee?",
            choices: roleArr,
          },
        ])
        .then((answers) => {
          connection.query(
            `UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.id}`,
            answers,
            (err, results) => {
              if (err) throw err;
              cb();
            }
          );
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
      // inquirer
      //   .prompt([
      //     {
      //       type: "list",
      //       name: "role_id",
      //       message: "Which employee's role do you want to update?",
      //       choices: employeeArray,
      //     },
      //     {
      //       type: "list",
      //       name: "role_id",
      //       message: "What role do you want to assign to the selected employee?",
      //       choices: employeeArray,
      //     },
      //   ])
      // .then((answers) => {
      //   connection.query(
      //     "INSERT INTO employee SET ?",
      //     answers,
      //     (err, results) => {
      //       if (err) throw err;
      //       cb();
      //     }
      //   );
    });
  });
}

module.exports = { viewEmployee, addEmployee, updateEmployee };
