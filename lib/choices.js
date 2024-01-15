// choices holds all the options that will be presented to the user when they run the program
const choices = [
  {
    type: "list",
    name: "choices",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"],
  },
];

// addDptQuestions asks the user to enter a department name
const addDptQuestions = [
    {
        type: "input",
        name: "name",
        message: "Please enter department name."
    }
];

module.exports = { choices, addDptQuestions};
