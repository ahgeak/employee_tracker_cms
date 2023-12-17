const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const choices = require('./lib/choices')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json);

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'company_db'
// });

function init() {
    inquirer.prompt(choices).then((answers) => {

    });
}

init();
