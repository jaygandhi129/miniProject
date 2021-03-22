const bodyParser = require("body-parser")
const express = require('express');
const app = express();
const path = require('path');
const md5 = require('md5');
const ejs = require("ejs")
const mysql = require('mysql')
const multer = require("multer");

require('dotenv').config()

app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
//Used to access static files from public folder
app.use(express.static("public"));

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

app.get("/",function(req,res){
 res.send("Hi");
});

/************************************Seller Starts*************************************************/

//Seller Landing Page
app.get("/business", function (req, res) {
    res.render('index');
});

//Seller Register Page-1
app.get("/business/register",function(req, res){
    res.render('sellerRegister1',{flag :false});
})

app.post("/business/register/home",function(req,res){
  var b_name=req.body.b_name;
  var b_owner=req.body.b_owner;
  var b_mobile=parseInt(req.body.b_mobile);
 res.render("sellerRegister1",{flag :true ,b_name,b_owner,b_mobile});
})




/************************************Seller Ends*************************************************/

app.listen(process.env.PORT || 3000, function () {
    console.log("Connected at 3000");
})
