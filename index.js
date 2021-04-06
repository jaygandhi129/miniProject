const bodyParser = require("body-parser")
const express = require('express');
const app = express();
const path = require('path');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const ejs = require("ejs")
const mysql = require('mysql')
const multer = require("multer");
const { connect } = require("http2");
const func = require('./func');
const flash = require('express-flash')
const session = require('express-session')
require('dotenv').config()

app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
//Used to access static files from public folder
app.use(express.static("public"));

//Configure View Engine
app.set('view engine', 'ejs');

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

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




// passport configure


const passport = require('passport')
const initializePassport = require('./passport-config');
initializePassport(passport,
   mobile=>{
  var phone;
  const query = "SELECT sPhoneNo, sId from seller_details where sPhoneNo = ?";
  connection.query(query,[mobile],function(err, rows){
    if (err){
      console.log(err);
    }else{
      phone = rows.sPhoneNo;
      id = rows.sId;
    }
  })
  return phone;
},id=>{
  var id;
  const query = "SELECT sId from seller_details where sPhoneNo = ?";
  connection.query(query,[mobile],function(err, rows){
    if (err){
      console.log(err);
    }else{
      id = rows.sId;
    }
  })
  return id;
})






app.get("/",function(req,res){
 res.send("Hi");
});

/************************************Seller Starts*************************************************/

//Seller Home Page
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

app.post("/business/register/nextstep",async (req,res) => {
    var data = req.body;
    var sPassword = await bcrypt.hash(data.sPassword,10);
    var query = "INSERT INTO seller_details (sName, sPhoneNo, sDOB, sGender, sAddress, sCity, sState, sZip, sAadhar, sPAN, sPassword) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var list = [data.sName, data.sPhoneNo, data.sDOB, data.sGender, data.sAddress, data.sCity, data.sState, data.sZip, data.sAadhar, data.sPAN, data.sPassword]
    connection.query(query, list, function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully inserted seller data.");
            var seller;
            connection.query("SELECT sId from seller_details where sPhoneNo = ?",data.sPhoneNo, function(err, row){
                if(err){
                    console.log(err);
                }
                else{
                    seller = row[0].sId;
                    var query2 = "INSERT INTO business_details (seller, bName, bCategory, bMobile, bGST,bEmail, bWebsite, bAddress, bCity, bState, bZip) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    var list = [seller, data.bName, data.bCategory, data.bMobile, data.bGST,data.bEmail, data.bWebsite, data.bAddress, data.bCity, data.bState, data.bZip];
                    connection.query(query2, list,function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Successfully inserted business data.");
                            func.sendmail(data.bEmail);
                            res.redirect("/business/register/success");
                        }
                    });

                }
            });

        }
    });
  });
  //Seller Register Success Page
  app.get("/business/register/success",function(req, res){
    res.render('success_bregister');
  });

  // Seller Login Starts //
  app.get("/business/login",function (req, res) {
      res.render('sellerLogin');
  });

  app.post("/business/login", passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/business/login',
    failureFlash: true
  }))

/************************************Seller Ends*************************************************/

app.listen(process.env.PORT || 3000, function () {
    console.log("Connected at 3000");
})
