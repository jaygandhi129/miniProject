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
const Passport = require('passport').Passport;
const passport = new Passport();
// const cpassport = new Passport();
const method_override = require('method-override');
var admin = require('firebase-admin');
const {
  format
} = require('util');
const cookieParser = require('cookie-parser');
app.use(cookieParser('MY SECRET'));


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

//Mongoose Connection



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

var {
  initialize
} = require('./modules/passport-config');
initialize(passport);



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 0) {
      console.log(req.user.role);
      return next()
    } else {
      res.redirect('/business/login');
    }

  } else {
    res.redirect('/business/login');
  }
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 0) {
      res.redirect('/dashboard');
    } else {
      next();
    }
  } else {
    next()
  }
}

function custCheckAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role == 1) {
      return next()
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
}

function custCheckNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role == 1) {
      res.redirect('/success-login');
    } else {
      next();
    }
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
  if (req.user) {
    if (req.user.role === 1) {
      let options = {
        maxAge: -1, // would expire after 30 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: false // Indicates if the cookie should be signed
      }
      res.cookie('pincode', req.user.cPincode, options);
      res.render('customerHome', {
        loggedIn: true,
        pincode: req.cookies.pincode,
        user: req.user
      });
    } else {
      res.render('customerHome', {
        pincode: req.cookies.pincode,
        loggedIn: false
      });
    }
  } else {
    res.render('customerHome', {
      pincode: req.cookies.pincode,
      loggedIn: false
    });
  }

});

app.post("/", function (req, res) {
  var pincode = req.body.pincode;
  let options = {
    maxAge: 1000 * 60 * 30, // would expire after 30 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed
  }
  res.cookie('pincode', pincode, options); // options is optional
  if (req.user) {
    if (req.user.role == 1) {
      res.render('customerHome', {
        loggedIn: true,
        pincode: pincode,
        user: req.user
      });

    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/changepincode", function (req, res) {
  res.clearCookie("pincode");
  if (req.user){

    if (req.user.role == 1) {
      res.render('customerHome', {
        loggedIn: true,
        pincode: undefined,
        user: req.user
      });
    } else {
      res.redirect("/");
    }
  }
  else {
    res.redirect("/");
  }
});

// Customer Login
app.get("/login", custCheckNotAuthenticated, function (req, res) {
  res.render("cLoginSignup");
});

app.post("/custRegister", custCheckNotAuthenticated, function (req, res) {
  data = req.body;
  query = "INSERT INTO cust_details (cName, cMobile, cEmail, cPincode, cPassword) values(?, ?, ?, ?, ?)";
  connection.query(query, [data.cName, data.cMobile, data.cEmail, data.cPincode, md5(data.cPassword)], function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Registered");
      res.redirect('/');
    }
  })
})

app.post('/custlogin', custCheckNotAuthenticated, passport.authenticate('customerLocal', {
  successRedirect: '/success-login',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/success-login', custCheckAuthenticated, function (req, res) {
  var pincode = req.user.cPincode;
  console.log("Pincode:" + pincode);
  let options = {
    maxAge: -1, // would expire after 30 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed
  }
  res.cookie('pincode', pincode, options); // options is optional
  res.render('customerHome', {
    loggedIn: true,
    pincode: pincode,
    user: req.user
  });
})

//Logout Users
app.delete('/logout-customer', (req, res) => {
  req.logOut();
  res.redirect('/');
})
















































































































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
  var states = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
  ]

  res.render("sellerRegister1", {
    flag: true,
    b_name,
    b_owner,
    b_mobile,
    states: states
  });
})

app.post("/business/register/nextstep", upload.fields([{
  name: 'bShop_photo',
  maxCount: 1
}]), checkNotAuthenticated, async (req, res) => {
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
              connection.query("select bId from business_details where seller = ?", [seller], function (err, rows3) {
                if (err) {
                  console.log(err);
                } else {
                  extension = path.extname(req.files.bShop_photo[0].originalname);
                  blob = bucket.file('Seller/' + seller + "/" + rows3[0].bId + '-photo' + extension);
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
                      `https://storage.googleapis.com/${bucket.name}/${blob.id}`
                    );
                    console.log(publicUrl);
                    //  console.log(bucket.name);
                    //  console.log(blob.name);
                    // res.status(200).send(publicUrl);
                  });
                  blobStream.end(req.files.bShop_photo[0].buffer);
                  connection.query("Update business_details set bPhotoId = ? where bId = ?", [blob.id, rows3[0].bId], function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Successfully inserted business data.");
                      //func.sendmail(data.bEmail);
                      res.redirect("/business/register/success");
                    }
                  })

                }
              });

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


app.post("/business/login", checkNotAuthenticated, passport.authenticate('sellerLocal', {
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
  connection.query("select bPhotoId from business_details where seller = ?", req.user.sId, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows[0].bPhotoId);
      res.render('dashboard', {
        name: req.user.sName,
        source: rows[0].bPhotoId
      });
    }
  })

});

app.get('/getCategory', function (req,res){

    var sql='SELECT  * FROM product_categories';
    connection.query(sql,function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});


app.get('/getSubCategory/:id', function (req,res){

    var catId = parseInt(req.params.id);
    var sql='SELECT * from product_subcategories where catId = ?';
    connection.query(sql,[catId],function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/addproduct', checkAuthenticated, function (req, res) {
      var query2 = "Select s.sName,b.bPhotoId from seller_details s inner join business_details b on s.sId=b.seller where s.sId=?";
      connection.query(query2, req.user.sId, function (err, rows1) {
        if (err) {
          console.log(err);
        } else {
          res.render('addProducts', {
            edit: false,
            name: rows1[0].sName,
            source: rows1[0].bPhotoId
          });
        }
      });
});

app.post('/addproduct', upload.fields([{
  name: 'product_photo',
  maxCount: 1
}]), checkAuthenticated, function (req, res) {
  var pDetails = req.body;
  var sId = req.user.sId;
  var query = "SELECT * FROM products WHERE pName = ? and pBrand = ?";
  connection.query(query, [pDetails.pName,pDetails.pBrand], function (err, rows) {
    if (err) {
      console.log(err);
    } else if (rows.length) {
      connection.query("INSERT INTO inventory (sellerPrice,stockAvailable,sId,pId,iDelivery,iDescription) VALUES(?,?,?,?,?,?)", [parseFloat(pDetails.pPrice), parseInt(pDetails.pQuantity), sId, rows[0].pId, pDetails.pDelivery, pDetails.pDescription], function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Data Inserted Successfully");
          res.redirect("/myproducts");
        }
      })
    } else {

      connection.query("INSERT INTO products (pName,pMrp,pCategory,pSubCategory,pBrand) VALUES(?,?,?,?,?)", [pDetails.pName, parseFloat(pDetails.pMRP), parseInt(pDetails.pCategory), parseInt(pDetails.pSubCategory),pDetails.pBrand], function (err) {
        if (err) {
          console.log(err);
        } else {
          extension = path.extname(req.files.product_photo[0].originalname);
          var query2 = "SELECT pId FROM products WHERE pName = ?"
          connection.query(query2, pDetails.pName, function (err, rows2) {
            if (err) {
              console.log(err);
            } else {
              blob = bucket.file('Product/' + rows2[0].pId + '-photo' + extension);
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
                //  console.log(publicUrl);
                //  console.log(bucket.name);
                //  console.log(blob.name);
                // res.status(200).send(publicUrl);
              });
              blobStream.end(req.files.product_photo[0].buffer);
              //  console.log(blob.id);


              var query3 = "UPDATE products SET pPhotoId = ? WHERE pId = ?";
              connection.query(query3, [blob.id, rows2[0].pId], function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Photo Id updated Successfully");
                }
              });
            }
          });
          var query = "SELECT * FROM products WHERE pName = ? and pBrand = ?";
          connection.query(query, [pDetails.pName,pDetails.pBrand], function (err, rows) {
            if (err) {
              console.log(err);
            } else {
              connection.query("INSERT INTO inventory (sellerPrice,stockAvailable,sId,pId,iDelivery,iDescription) VALUES(?,?,?,?,?,?)", [parseFloat(pDetails.pPrice), parseInt(pDetails.pQuantity), sId, rows[0].pId, pDetails.pDelivery,pDetails.pDescription], function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Data Inserted Successfully");
                  res.redirect("/myproducts");
                }
              })
            }
          });
        }
      });
    }
  });
});






//profile.ejs starts
app.get('/sellerprofile', checkAuthenticated, function (req, res) {

  var query = "SELECT s.sId, s.sName,s.sPhoneNo,s.sDOB,b.bName,b.bCategory,b.bMobile,b.bGST,b.bEmail,b.bWebsite,b.bAddress,b.bCity,b.bState,b.bZip,b.bPhotoId from seller_details s inner join business_details b on b.seller=s.sId where s.sId =?";
  connection.query(query, req.user.sId, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.render('profile', {
        rows,
        name: rows[0].sName,
        source: rows[0].bPhotoId
      });
    }
  });

});

app.post("/updateprofileseller", checkAuthenticated, function (req, res) {
  var data = req.body;
  var query = "UPDATE seller_details SET sName=?,sDOB=? where sId=?";
  connection.query(query, [data.sName, data.sDOB, req.user.sId], function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/sellerprofile');
    }
  });
})

app.post("/updateprofilebusiness", checkAuthenticated, function (req, res) {
  var data = req.body;
  var query = "UPDATE business_details SET bName=?,bCategory=?,bMobile=?,bEmail=?,bWebsite=?,bAddress=?,bCity=?,bState=?,bZip=? where seller=?";
  connection.query(query, [data.bName, data.bCategory, data.bMobile, data.bEmail, data.bWebsite, data.bAddress, data.bCity, data.bState, data.bZip, req.user.sId], function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/sellerprofile');
    }
  });
})
//profile.ejs ends

//myproducts.ejs starts
app.get('/myproducts', checkAuthenticated, function (req, res) {
  var query = "SELECT p.pId,p.pSubCategory,p.pBrand,p.pName,p.pMrp,p.pCategory,c.catName,sc.subCatName,p.pPhotoId,i.iId,i.sellerPrice,i.stockAvailable,i.iDelivery from products p inner join inventory i on p.pId = i.pId inner join product_categories c on c.catId = p.pCategory inner join product_subcategories sc on sc.subCatId = p.pSubCategory where i.sId = ? "
  var photos = [];
  connection.query(query, req.user.sId, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      var query2 = "Select s.sName,b.bPhotoId from seller_details s inner join business_details b on s.sId=b.seller where s.sId=?";
      connection.query(query2, req.user.sId, function (err, rows1) {
        if (err) {
          console.log(err);
        } else {
          res.render('myproducts', {
            rows,
            edit: false,
            name: rows1[0].sName,
            source: rows1[0].bPhotoId
          })
        }

      });
    }
  });
});
app.post('/myproducts', checkAuthenticated, function (req, res) {
  console.log("Server Side " + req.body.name);
  console.log(req.body.deleteproduct);
  var inventid = req.body.deleteproduct;
  var query4 = "delete from inventory where iId=?";
  connection.query(query4, inventid, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
      res.redirect('/myproducts');
    }
  })
  if (req.body.name === "undefined") {
    res.redirect('/business')
  }
})

app.post("/editProduct", checkAuthenticated, function (req, res) {
  var query = "SELECT p.pId,p.pSubCategory,p.pBrand,p.pName,p.pMrp,p.pCategory,c.catName,sc.subCatName,p.pPhotoId,i.iId,i.sellerPrice,i.stockAvailable,i.iDelivery from products p inner join inventory i on p.pId = i.pId inner join product_categories c on c.catId = p.pCategory inner join product_subcategories sc on sc.subCatId = p.pSubCategory where i.sId = ? "
  var photos = [];
  var editValue = req.body.editbtn;
  console.log("edit : " + editValue);

  connection.query(query, req.user.sId, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      var query2 = "Select s.sName,b.bPhotoId from seller_details s inner join business_details b on s.sId=b.seller where s.sId=?";
      connection.query(query2, req.user.sId, function (err, rows1) {
        if (err) {
          console.log(err);
        } else {
          res.render('myproducts', {
            rows,
            edit: true,
            name: rows1[0].sName,
            source: rows1[0].bPhotoId,
            editValue
          })
        }
      });
    }
  });
});
app.post("/saveProduct", checkAuthenticated, function (req, res) {

  var data = req.body;
  var query = "UPDATE inventory i SET i.stockAvailable = ? , i.sellerPrice = ? , i.iDelivery = ? where iId = ?";
  connection.query(query, [parseInt(data.stockAvailable), parseFloat(data.sellerPrice), data.iDelivery, parseInt(data.savebtn)], function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      var query = "SELECT p.pId,p.pSubCategory,p.pBrand,p.pName,p.pMrp,p.pCategory,c.catName,sc.subCatName,p.pPhotoId,i.iId,i.sellerPrice,i.stockAvailable,i.iDelivery from products p inner join inventory i on p.pId = i.pId inner join product_categories c on c.catId = p.pCategory inner join product_subcategories sc on sc.subCatId = p.pSubCategory where i.sId = ? "
      console.log("Products data updated successfully");
      connection.query(query, req.user.sId, function (err, rows) {
        if (err) {
          console.log(err);
        } else {
          var query2 = "Select s.sName,b.bPhotoId from seller_details s inner join business_details b on s.sId=b.seller where s.sId=?";
          connection.query(query2, req.user.sId, function (err, rows1) {
            if (err) {
              console.log(err);
            } else {
              res.render('myproducts', {
                rows,
                edit: false,
                name: rows1[0].sName,
                source: rows1[0].bPhotoId,

              })
            }
          });
        }
      });
    }
  });
});

//myproducts.ejs ends

/************************************Seller Ends*************************************************/

app.listen(process.env.PORT || 3000, function () {
  console.log("Connected at 3000");
});
