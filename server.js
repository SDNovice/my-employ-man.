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
    password: '';
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the courses_db database.`)
);

db.query(`SELECT * FROM departments`, (err, results) => {
    const table = cTable.getTable(results);
    console.log(table);
});

db.query(`SELECT * FROM roles`, (err, results) => {
    const table = cTable.getTable(results);
    console.log(table);
});

db.query(`SELECT * FROM employees`, (err, results) => {
    const table = cTable.getTable(results);
    console.log(table);
});

