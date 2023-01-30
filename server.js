const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

const homeList = {
        type: "list",
        message: "Choose what you would like to do",
        name: "desiredAction",
        choices: ["View All Employees", 
                  "Add Employee", 
                  "Update Employee Role", 
                  "View All Roles", 
                  "Add Role", 
                  "View All Departments", 
                  "Add Department",
                  "Quit"],
        loop: true
    };
 
inquirer.prompt(homeList).then((response) => {
    if (response.desiredAction === homeList.choices[0]) {
        db.query(`SELECT * FROM employees`, (err, results) => {
                const table = cTable.getTable(results);
                console.log(table);
            });
       } else if (response.desiredAction === homeList.choices[3]){
            db.query(`SELECT * FROM roles`, (err, results) => {
                const table = cTable.getTable(results);
                console.log(table);
            });
       } else if (response.desiredAction === homeList.choices[5]){
            let i = 5;
            handleDepartment(i);
       } else if (response.desiredAction === homeList.choices[6]){
            let i = 6;
            handleDepartment(i);
       }
    }
); 
function handleDepartment(i){
    const newDepartment = {
            type: "input",
            message: "Give This Department A Name",
            name: "deptName"
        }

    if (i === 5 ){
        db.query(`SELECT * FROM departments`, (err, results) => {
            const table = cTable.getTable(results);
            console.log(table);
        });
    } else if (i === 6) {
        inquirer.prompt(newDepartment).then((response) => {
            db.query(`ALTER TABLE departments MODIFY id INT NOT NULL AUTO_INCREMENT;`);
            db.query(`INSERT INTO departments(name) VALUES (?)`, response.deptName);
        })
    }
};
// db.query(`SELECT * FROM departments`, (err, results) => {
//     const table = cTable.getTable(results);
//     console.log(table);
// });

// db.query(`SELECT * FROM roles`, (err, results) => {
//     const table = cTable.getTable(results);
//     console.log(table);
// });

// db.query(`SELECT * FROM employees`, (err, results) => {
//     const table = cTable.getTable(results);
//     console.log(table);
// });

