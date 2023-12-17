// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const choices = [
  {
    type: "list",
    name: "choices",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Update an employee role"],
  },
];

module.exports = choices;
