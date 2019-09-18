const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const departments = require('./api/routes/department');
const employees = require('./api/routes/employee');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/departments',departments);
app.use('/employees',employees);




module.exports = app;
