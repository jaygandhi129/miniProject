const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const md5 = require('md5');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  dateStrings: 'date'
});

connection.connect();


function initialize(passport) {
  /////Seller Local Login
  passport.use('sellerLocal', new LocalStrategy({
      usernameField: 'mobile',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, mobile, password, done) {
      console.log(mobile, password)
      connection.query('SELECT * from seller_details where sPhoneNo = ?', mobile, function (err, rows) {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (!rows.length) {
          console.log("User not found");
          return done(null, false, {
            'message': 'No user found'
          });
        }
        if (md5(password) !== rows[0].sPassword) {
          console.log("Password wrong");
          return done(null, false, {
            'message': 'Oops! Wrong password.'
          });
        } else {
          return done(null, rows[0]);
        }
        // bcrypt.compare(password, rows[0].sPassword).then(function(){
        //   console.log(bool);
        //   if(bool == false){
        //     console.log("Password wrong "+bcrypt.hash(password,10)+ "   " + rows[0].sPassword);
        //     return done(null, false, {'message':'Oops! Wrong password.'});
        //   }
        //   else{
        //     console.log(password);
        //     return done(null, rows[0]);
        //   }
        // })
        // if (bcrypt.compare(password ,rows[0].sPassword)){
        //   console.log("Password wrong "+bcrypt.hash(password,10)+ "   " + rows[0].sPassword);
        //     return done(null, false, {'message':'Oops! Wrong password.'});}
        //   else{
        //     console.log(password);
        //     return done(null, rows[0]);	
        //   }
      })
    }
  ))

  //CustomerLocal Login 
  passport.use('customerLocal', new LocalStrategy({
      usernameField: 'cMobile',
      passwordField: 'cPassword',
      passReqToCallback: true
    },
    function (req, cMobile, cPassword, done) {
      connection.query('SELECT * from cust_details where cMobile = ?', cMobile, function (err, rows) {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (!rows.length) {
          console.log("User not found");
          return done(null, false, {
            'message': 'No user found'
          });
        }
        if (md5(cPassword) !== rows[0].cPassword) {
          console.log("Password wrong");
          return done(null, false, {
            'message': 'Oops! Wrong password.'
          });
        } else {
          console.log("Authenticated");
          return done(null, rows[0]);
        }
        // bcrypt.compare(password, rows[0].sPassword).then(function(){
        //   console.log(bool);
        //   if(bool == false){
        //     console.log("Password wrong "+bcrypt.hash(password,10)+ "   " + rows[0].sPassword);
        //     return done(null, false, {'message':'Oops! Wrong password.'});
        //   }
        //   else{
        //     console.log(password);
        //     return done(null, rows[0]);
        //   }
        // })
        // if (bcrypt.compare(password ,rows[0].sPassword)){
        //   console.log("Password wrong "+bcrypt.hash(password,10)+ "   " + rows[0].sPassword);
        //     return done(null, false, {'message':'Oops! Wrong password.'});}
        //   else{
        //     console.log(password);
        //     return done(null, rows[0]);	
        //   }
      })
    }
  ))
  passport.serializeUser((user, done) => {
    done(null, user);
  })
  passport.deserializeUser(function (user, done) {
    if (user.role == 0) {
      connection.query("select * from seller_details where sId = " + user.sId, function (err, rows) {
        done(err, rows[0]);
      });
    } 
    else{
      connection.query("select * from cust_details where cId = " + user.cId, function (err, rows) {
        done(err, rows[0]);
      });
    }
  });
}



module.exports = {
  initialize
}