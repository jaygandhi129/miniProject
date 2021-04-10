require('dotenv').config()
const bodyParser = require("body-parser")
const express = require('express');
const app = express();
const path = require('path');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const ejs = require("ejs")
const mysql = require('mysql')
const multer = require("multer");
const func = require('./func');
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const method_override = require('method-override');
var admin = require('firebase-admin');
const { format } = require('util');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(method_override('_method'));
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

const initializePassport = require('./passport-config');
initializePassport(passport);


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/business/login');
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    next()
  }
}


/////////////////////Firebase and Multer Configure///////////////////////////////
var serviceAccount = require(process.env.FIREBASE_SERVICEACC_KEY);
admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_SERVICEACC_KEY))
});
//admin.initializeApp(firebaseConfig);
var storage = admin.storage();
var bucket = storage.bucket('gs://cornerkart-cd3d7.appspot.com');
var extension;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2000000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};







app.get("/", function (req, res) {
  res.send("Hi");
});

/************************************Seller Starts*************************************************/

//Seller Home Page
app.get("/business", function (req, res) {
  res.render('index');
});

//Seller Register Page-1
app.get("/business/register", checkNotAuthenticated, function (req, res) {
  res.render('sellerRegister1', {
    flag: false
  });
})

app.post("/business/register/home", checkNotAuthenticated, function (req, res) {
  var b_name = req.body.b_name;
  var b_owner = req.body.b_owner;
  var b_mobile = parseInt(req.body.b_mobile);
  res.render("sellerRegister1", {
    flag: true,
    b_name,
    b_owner,
    b_mobile
  });
})

app.post("/business/register/nextstep", checkNotAuthenticated, async (req, res) => {
  var data = req.body;
  var sPassword = md5(data.sPassword);
  var query = "INSERT INTO seller_details (sName, sPhoneNo, sDOB, sGender, sAddress, sCity, sState, sZip, sAadhar, sPAN, sPassword) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var list = [data.sName, data.sPhoneNo, data.sDOB, data.sGender, data.sAddress, data.sCity, data.sState, data.sZip, data.sAadhar, data.sPAN, sPassword]
  connection.query(query, list, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully inserted seller data.");
      var seller;
      connection.query("SELECT sId from seller_details where sPhoneNo = ?", data.sPhoneNo, function (err, row) {
        if (err) {
          console.log(err);
        } else {
          seller = row[0].sId;
          var query2 = "INSERT INTO business_details (seller, bName, bCategory, bMobile, bGST,bEmail, bWebsite, bAddress, bCity, bState, bZip) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          var list = [seller, data.bName, data.bCategory, data.bMobile, data.bGST, data.bEmail, data.bWebsite, data.bAddress, data.bCity, data.bState, data.bZip];
          connection.query(query2, list, function (err) {
            if (err) {
              console.log(err);
            } else {
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
app.get("/business/register/success", checkNotAuthenticated, function (req, res) {
  res.render('success_bregister');
});

// Seller Login Starts //
app.get("/business/login", checkNotAuthenticated, function (req, res) {
  res.render('sellerLogin');
});


app.post("/business/login", checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/business/login',
  failureFlash: true
}));

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/business/login');
})


//Seller Dashboard Starts////////////////
app.get('/dashboard', checkAuthenticated, function (req, res) {
  res.render('dashboard', {
    name: req.user.sName
  });
});

app.get('/addproduct', checkAuthenticated, function (req, res) {
  res.render('addProducts');
});

app.post('/addproduct', upload.fields([{ name: 'product_photo', maxCount: 1 }]), checkAuthenticated, function (req, res) {
  var pDetails = req.body;
  extension = path.extname(req.files.product_photo[0].originalname);
  console.log(req.files.product_photo[0].originalname);
  blob = bucket.file('Product/' + pDetails.pName + '-photo' + extension);
  blobStream = blob.createWriteStream({
    metadata: {
      contentType: blob.mimetype
    }
  });
  blobStream.on('error', err => {
    console.log(err);
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    console.log(publicUrl);
    console.log(bucket.name);
    console.log(blob.name);
    // res.status(200).send(publicUrl);
  });
  blobStream.end(req.files.product_photo[0].buffer);
  var photo = pDetails.pId + '-photo' + extension;

  res.redirect('/addproduct');

});

///Retrive file from firebase storage
// app.get('/test',checkAuthenticated, function (req, res){
//   bucket.file('Product/Mi-photo.PNG').get(function (err,file,apiResponse){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("ID is:"+file.id);
//       res.render('test',{id:file.id});
//     }
//   })
// })



app.get('/sellerprofile', checkAuthenticated, function (req, res) {
  res.render('profile');
});
/************************************Seller Ends*************************************************/

app.listen(process.env.PORT || 3000, function () {
  console.log("Connected at 3000");
})