const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const path = require('path');
const md5 = require('md5');
const ejs = require("ejs")
const mysql = require('mysql')
const multer = require("multer");

require('dotenv').config()


//Used to access static files from public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

//Configure View Engine
app.set('view engine', 'ejs');

//Establishing Connection to database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    dateStrings: 'date'
});

connection.connect(function (error) {
    if (error) {
        console.log("Error in Connecting Database");
        throw error;
    } else {
        console.log("Connected to Database");
    }
});



app.get("/business", function (req, res) {
    res.render('index');
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Connected at 3000");
})
