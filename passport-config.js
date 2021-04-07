const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mysql = require('mysql')

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  dateStrings: 'date'
});

connection.connect();


function initialize(passport){

  passport.use(new LocalStrategy({usernameField: 'mobile',passwordField: 'password',passReqToCallback : true},
  function(req,mobile,password,done){
    connection.query('SELECT * from seller_details where sPhoneNo = ?',mobile,function(err,rows){
      if(err){
        return done(err);
      }
      if (!rows.length) {
        console.log("User not found");
        return done(null, false, {'message':'No user found'}); 
    } 
    if (password !== rows[0].sPassword){
      console.log("Password wrong "+ password + rows[0].sPassword);
        return done(null, false, {'message':'Oops! Wrong password.'});}
      else{
        return done(null, rows[0]);	
      }
    })
}
  ))
  passport.serializeUser((user,done)=>done(null,user.sId))
  passport.deserializeUser(function(sId, done) {
		connection.query("select * from seller_details where sId = "+sId,function(err,rows){	
			done(err, rows[0]);
		});
    });
}

module.exports = initialize
