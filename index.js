require('dotenv').config()
const bodyParser = require("body-parser")
const express = require('express');
const app = express();
const path = require('path');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const ejs = require("ejs")
const webpush = require('web-push');
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








//git




//Establishing Connection to database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    port: 3306,
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

// Razorpay Payment Gateway Setup
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// passport configure

var {
    initialize
} = require('./modules/passport-config');
initialize(passport);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role === 0) {
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
            res.redirect('/');
        }
    } else {
        res.redirect('/');
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

function adminCheckAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role == 2) {
            return next()
        } else {
            res.redirect('/adminLogin');
        }
    } else {
        res.redirect('/adminLogin');
    }
}

function adminCheckNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role == 2) {
            res.redirect('/adminDashboard');
        } else {
            next();
        }
    } else {
        next()
    }
}






//Push Notifications
// Generating vapid keys for push notifications

let publicVapKey = "BMDSmegidXe3Cj9BKhYmgQvxQy_np9vrhcNvPccxtgSy0qQ26BfQnn8d0wHxMCW938Lb1RAvMfiKe8dgd_lyX8U";
let privateVapKey = process.env.PRIVATE_NOTIFICATION_KEY;
webpush.setVapidDetails('mailto:cornerkart4@gmail.com', publicVapKey, privateVapKey);


app.post('/subscribeNotification', custCheckAuthenticated, (req, res) => {
    //Get subscription object
    const subscription = req.body;
    // console.log("Subscription: ",subscription);
    //Sending subscription to database
    connection.query('select * from customer_subscription where cId = ?', [req.user.cId], (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length > 0) {
            // console.log("Subscription already exists");
            connection.query("update customer_subscription set subscription = ? where cId = ?", [JSON.stringify(subscription), req.user.cId], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Subscription already exists");
                    console.log("Subscription Updated");
                }
            });
        }
        else {
            // console.log("Subscription added");
            connection.query(`INSERT INTO customer_subscription VALUES (?,?)`, [req.user.cId, JSON.stringify(subscription)], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Subscription added to database");
                }
            });
        }
    })

    //Send 201 - resource created
    res.status(201).json({});
    //Create payload
    const payload = JSON.stringify({
        title: 'Push Test',
        body: 'This is a test notification',
        icon: 'https://i.ibb.co/0jqXFdv/logo.png',
    });
    //Sending Notification
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));

});

app.post('/subscribeNotificationSeller', checkAuthenticated, (req, res) => {
    //Get subscription object
    const subscription = req.body;
    console.log("Subscription: ", subscription);
    //Sending subscription to database
    connection.query('select * from seller_subscription where sId = ?', [req.user.sId], (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length > 0) {
            // console.log("Subscription already exists");
            connection.query("update seller_subscription set subscription = ? where sId = ?", [JSON.stringify(subscription), req.user.sId], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Subscription already exists");
                    console.log("Subscription Updated");
                }
            });
        }
        else {
            // console.log("Subscription added");
            connection.query(`INSERT INTO seller_subscription VALUES (?,?)`, [req.user.sId, JSON.stringify(subscription)], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Subscription added to database");
                }
            });
        }
    })
    console.log("hellooooooo");
    //Send 201 - resource created
    res.status(201).json({});
    //Create payload
    const payload = JSON.stringify({
        title: 'Push Test',
        body: 'This is a test notification',
        icon: 'https://i.ibb.co/0jqXFdv/logo.png',
    });
    //Sending Notification
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));
    console.log("noti-sent");

});
































/////////////////////Firebase and Multer Configure///////////////////////////////
// var serviceAccount = require(process.env.FIREBASE_SERVICEACC_KEY);
var serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.CLIENT_URL,
}
// admin.initializeApp({
//     credential: admin.credential.cert(require(process.env.FIREBASE_SERVICEACC_KEY))
// });
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
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
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};




app.get("/", function (req, res) {

    if (req.cookies.pincode !== undefined) {

        var query = "select  p.pId,p.pName,p.pPhotoId,p.pBrand,p.pMrp,min(i.sellerPrice) as minPrice,ceil(((p.pMrp - i.sellerPrice)/p.pMrp*100)) as difference from products p inner join inventory i on p.pId = i.pId inner join business_details b on i.sId = b.seller where p.isBan=0 and b.bZip = ? group by p.pId order by difference desc limit 8; ";
        connection.query(query, [req.cookies.pincode], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                var query2 = "select  p.pId,p.pName,p.pPhotoId,p.pBrand,p.pMrp,min(i.sellerPrice) as minPrice from products p inner join inventory i on p.pId = i.pId inner join business_details b on i.sId = b.seller where p.isBan=0 and b.bZip = ? and p.pCategory = 2000021 group by p.pId limit 8";
                connection.query(query2, [req.cookies.pincode], function (err, rows2) {
                    if (err) {
                        console.log(err);
                    } else {
                        var query3 = "SELECT p.pId,p.pName,p.pMrp,p.pPhotoId,p.pBrand,min(i.sellerPrice) as minPrice FROM products p inner join inventory i on p.pId=i.pId inner join business_details b on i.sId=b.seller where p.isBan=0 and pCategory=2000007 and pSubCategory=3000088 and b.bZip=? group by p.pId limit 8";
                        connection.query(query3, [req.cookies.pincode], function (err, rows3) {
                            if (err) {
                                console.log(err);
                            } else {

                                var query4 = "SELECT p.pId,p.pName,p.pMrp,p.pPhotoId,p.pBrand,min(i.sellerPrice) as minPrice FROM products p inner join inventory i on p.pId=i.pId inner join business_details b on i.sId=b.seller where p.isBan=0 and pCategory=2000001 and pSubCategory!=3000011 and pSubCategory!=3000012 and pSubCategory!=3000013 and b.bZip=? group by p.pId limit 8";
                                connection.query(query4, [req.cookies.pincode], function (err, rows4) {
                                    if (err) {
                                        console.log(err);
                                    } else {

                                        var query5 = "SELECT o.seller_id,b.bName,b.bAddress,b.bCity,b.bPhotoId, (select count(seller_id) from orders where order_status='Order Completed' and order_zip=? and seller_id=o.seller_id) as count FROM orders o inner join business_details b on b.seller=o.seller_id where order_zip=? group by seller_id order by count desc limit 8;";
                                        connection.query(query5, [req.cookies.pincode, req.cookies.pincode], function (err, rows5) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                query6 = "select count(od.product_id) as count,od.product_id,p.pPhotoId,p.pName,p.pBrand,p.pMRP,min(i.sellerPrice) from order_details od inner join products p on od.product_id = p.pId inner join inventory i on i.pId = od.product_id inner join orders o on o.order_id = od.order_id where p.isBan=0 and o.order_zip = ? and od.prod_status = 'Order Completed'  group by od.product_id order by count(od.product_id) desc limit 8;";
                                                connection.query(query6, [req.cookies.pincode], function (err, rows6) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        if (req.user) {

                                                            if (req.user.role === 1) {
                                                                res.render('customerHome', {
                                                                    pincode: req.cookies.pincode,
                                                                    user: req.user,
                                                                    loggedIn: true,
                                                                    rows,
                                                                    rows2,
                                                                    rows3,
                                                                    rows4,
                                                                    rows5,
                                                                    rows6
                                                                });
                                                            } else {
                                                                res.render('customerHome', {
                                                                    pincode: req.cookies.pincode,
                                                                    loggedIn: false,
                                                                    rows,
                                                                    rows2,
                                                                    rows3,
                                                                    rows4,
                                                                    rows5,
                                                                    rows6
                                                                });
                                                            }
                                                        } else {
                                                            res.render('customerHome', {
                                                                pincode: req.cookies.pincode,
                                                                loggedIn: false,
                                                                rows,
                                                                rows2,
                                                                rows3,
                                                                rows4,
                                                                rows5,
                                                                rows6
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    } else {
        console.log("no pin");
        if (req.user) {
            if (req.user.role === 1) {
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
    }

});

app.post("/", function (req, res) {
    var pincode = req.body.pincode;
    let options = {
        maxAge: 365 * 24 * 60 * 60 * 1000, // would expire after 30 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: false // Indicates if the cookie should be signed
    }
    res.cookie('pincode', pincode, options); // options is optional
    if (req.user) {
        if (req.user.role == 1) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

app.get("/changepincode", function (req, res) {
    res.clearCookie("pincode");
    if (req.user) {
        if (req.user.role == 1) {
            res.render('customerHome', {
                loggedIn: true,
                pincode: undefined,
                user: req.user
            });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});


app.get("/changePincodeCat/:catId", function (req, res) {
    res.clearCookie("pincode");
    var catid = req.params.catId;
    if (req.user) {
        if (req.user.role == 1) {
            res.redirect("/productList/" + catid);
        } else {
            res.redirect("/productList/" + catid);
        }
    } else {
        res.redirect("/productList/" + catid);
    }
});

app.post("/productList/:catId", function (req, res) {
    var catId = req.params.catId;
    var pincode = req.body.pincode;
    let options = {
        maxAge: 365 * 24 * 60 * 60 * 1000, // would expire after 30 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: false // Indicates if the cookie should be signed
    }
    res.cookie('pincode', pincode, options);
    if (req.user) {
        if (req.user.role == 1) {
            res.redirect("/productList/" + catId)
        } else {
            res.redirect("/productList/" + catId);
        }
    } else {
        res.redirect("/productList/" + catId);
    }
});


// Customer Login
app.get("/login", custCheckNotAuthenticated, function (req, res) {
    res.render("cLoginSignup", {
        err: undefined
    });
});

app.post("/custRegister", custCheckNotAuthenticated, function (req, res) {
    data = req.body;
    query = "INSERT INTO cust_details (cName, cMobile, cEmail, cPincode, cPassword) values(?, ?, ?, ?, ?)";
    connection.query(query, [data.cName, data.cMobile, data.cEmail, data.cPincode, md5(data.cPassword)], function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})

app.post('/custlogin', custCheckNotAuthenticated, passport.authenticate('customerLocal', {
    successRedirect: '/',
    failureRedirect: '/custloginfail',
    failureFlash: true
}));

app.get('/custloginfail', function (req, res) {
    res.render("cLoginSignup", {
        err: "Incorrect Mobile number or Password"
    });
});

app.get('/success-login', custCheckAuthenticated, function (req, res) {
    var pincode = req.cookies.pincode;
    res.redirect("/");
})

//Logout Users
app.delete('/logout-customer', (req, res) => {
    req.logOut();
    res.redirect('/');
});

app.get('/getCategory', function (req, res) {
    var sql = 'SELECT  * FROM product_categories order by catName';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


app.get('/getSubCategory/:id', function (req, res) {
    var catId = parseInt(req.params.id);
    var sql = 'SELECT * from product_subcategories where catId = ? order by subCatName';
    connection.query(sql, [catId], function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/productList/:cId', function (req, res) {
    query = 'SELECT * from product_categories where catId = ?'
    connection.query(query, [req.params.cId], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            query2 = "select p.pId,p.pName,p.pMrp,p.pPhotoId,p.pBrand,min(i.sellerPrice) as price from products p inner join inventory i on p.pId =i.pId inner join business_details b on i.sId = b.seller where p.isBan=0 and p.pCategory=? and b.bZip=? group by p.pId;"
            connection.query(query2, [parseInt(req.params.cId), parseInt(req.cookies.pincode)], function (err, rows1) {
                if (err) {
                    console.log(err);
                    res.render('productPage', {
                        rows,
                        rows1: undefined,
                        loggedIn: false,
                        pincode: req.cookies.pincode,
                    });
                } else {
                    query3 = "select p.pId,p.pName,p.pMrp,p.pPhotoId,p.pBrand, round(avg(pf.p_rating),2) as avg_rating,min(i.sellerPrice) as price from products p inner join inventory i on p.pId =i.pId inner join business_details b on i.sId = b.seller inner join product_feedback pf on pf.pId = p.pId where p.isBan=0 and p.pCategory=? and b.bZip=? group by p.pId order by avg_rating desc limit 10;"
                    connection.query(query3, [parseInt(req.params.cId), parseInt(req.cookies.pincode)], function (err, rows3) {
                        if (err) {
                            console.log(err);
                        }
                        else {

                            if (req.user) {
                                pincode = req.cookies.pincode;
                                if (req.user.role === 1) {
                                    res.render('productPage', {
                                        rows,
                                        rows1,
                                        rows3,
                                        loggedIn: true,
                                        pincode: req.cookies.pincode,
                                        user: req.user
                                    });
                                } else {
                                    res.render('productPage', {
                                        rows,
                                        rows1,
                                        rows3,
                                        pincode: req.cookies.pincode,
                                        loggedIn: false
                                    });
                                }
                            } else {
                                res.render('productPage', {
                                    rows,
                                    rows1,
                                    rows3,
                                    pincode: req.cookies.pincode,
                                    loggedIn: false
                                });
                            }
                        }
                    })
                }
            });
        }
    });
});

// SubCategory display

app.get('/productListBySub/:subCatId', function (req, res) {
    query = 'SELECT * from product_subcategories where subCatId = ?'
    connection.query(query, [req.params.subCatId], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            query2 = "select p.pId,p.pName,p.pMrp,p.pPhotoId,p.pBrand,min(i.sellerPrice) as price from products p inner join inventory i on p.pId =i.pId inner join business_details s on i.sId = s.seller where p.isBan=0 and p.pSubCategory=? and s.bZip=? group by p.pId;"
            connection.query(query2, [parseInt(req.params.subCatId), parseInt(req.cookies.pincode)], function (err, rows1) {
                if (err) {
                    console.log(err);
                    res.render('productPage', {
                        rows,
                        rows1: undefined,
                        loggedIn: true,
                        pincode: req.cookies.pincode,
                        user: req.user
                    });
                } else {
                    query3 = "select p.pId,p.pName,p.pMrp,p.pPhotoId,p.pBrand,round(avg(pf.p_rating),2) as avg_rating,min(i.sellerPrice) as price from products p inner join inventory i on p.pId =i.pId inner join business_details s on i.sId = s.seller inner join product_feedback pf on pf.pId = p.pId where p.isBan=0 and p.pSubCategory=? and s.bZip=? group by p.pId order by avg_rating desc limit 10;"
                    connection.query(query3, [parseInt(req.params.subCatId), parseInt(req.cookies.pincode)], function (err, rows3) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (req.user) {
                                pincode = req.cookies.pincode;
                                if (req.user.role === 1) {
                                    res.render('productPage', {
                                        rows,
                                        rows1,
                                        rows3,
                                        loggedIn: true,
                                        pincode: req.cookies.pincode,
                                        user: req.user
                                    });
                                } else {
                                    res.render('productPage', {
                                        rows,
                                        rows1,
                                        rows3,
                                        pincode: req.cookies.pincode,
                                        loggedIn: false
                                    });
                                }
                            } else {
                                res.render('productPage', {
                                    rows,
                                    rows1,
                                    rows3,
                                    pincode: req.cookies.pincode,
                                    loggedIn: false
                                });
                            }
                        }
                    })

                }
            });
        }
    });
});

// productDetails.ejs Starts
app.get('/productDetails/:pId', function (req, res) {
    var pId = req.params.pId;
    var query = "select p.pId,p.pName,p.pMrp,p.pCategory,p.pSubCategory,p.pBrand,p.pPhotoId,sc.subCatName,sc.subCatId,c.catName,c.catId from products p inner join product_subcategories sc on p.pSubCategory = sc.subCatId inner join product_categories c on p.pCategory = c.catId where p.isBan=0 and pId = ?"
    connection.query(query, [pId], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var query1 = "select pf.p_rating,pf.p_rating*20 as per_rating,pf.p_review,c.cName from product_feedback pf inner join cust_details c on pf.cId= c.cId where c.cPincode=? and pf.pId=?;";
            connection.query(query1, [req.cookies.pincode, pId], function (err, rows1) {
                if (err) {
                    console.log(err);
                } else {
                    var query2 = "select avg(pf.p_rating)*20 as avg_rating from product_feedback pf inner join cust_details c on pf.cId= c.cId where c.cPincode=? and pf.pId=?;"
                    connection.query(query2, [req.cookies.pincode, pId], function (err, rows2) {

                        if (err) {
                            console.log(err);
                        }
                        else {

                            if (req.user) {
                                pincode = req.cookies.pincode;
                                if (req.user.role === 1) {
                                    var query4 = "select product_id from wishlist where cust_id=?";

                                    connection.query(query4, [req.user.cId], function (err, rows4) {
                                        if (err) {
                                            console.log(err);
                                        } else {

                                            var wishlist = [];
                                            rows4.forEach(function (row) {
                                                wishlist.push(row.product_id)
                                            });
                                            res.render('productDetails', {
                                                rows,
                                                rows1,
                                                rows2,
                                                loggedIn: true,
                                                pincode: req.cookies.pincode,
                                                rows4: wishlist,
                                                user: req.user
                                            });
                                        }
                                    });

                                } else {
                                    res.render('productDetails', {
                                        rows,
                                        rows1,
                                        rows2,
                                        rows4: [],
                                        pincode: req.cookies.pincode,
                                        loggedIn: false
                                    });
                                }
                            } else {
                                res.render('productDetails', {
                                    rows,
                                    rows1,
                                    rows2,
                                    rows4: [],
                                    pincode: req.cookies.pincode,
                                    loggedIn: false
                                });
                            }
                        }

                    })

                }
            });
        }
    });
});

app.post("/productDetails/:pId", function (req, res) {
    var pId = req.params.pId;
    var pincode = req.body.pincode;
    let options = {
        maxAge: 365 * 24 * 60 * 60 * 1000, // would expire after 30 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: false // Indicates if the cookie should be signed
    }
    res.cookie('pincode', pincode, options);
    if (req.user) {
        if (req.user.role == 1) {
            res.redirect("/productDetails/" + pId)
        } else {
            res.redirect("/productDetails/" + pId);
        }
    } else {
        res.redirect("/productDetails/" + pId);
    }
});

app.get("/reportProduct/:pId", custCheckAuthenticated, function (req, res) {
    var pId = req.params.pId;
    res.render('reportProductForm', {
        loggedIn: true,
        pincode: req.cookies.pincode,
        user: req.user,
        pId: pId,
        alreadyReported: false
    });
});

app.post('/reportProduct', custCheckAuthenticated, function (req, res) {
    var pId = req.body.pId;
    var cId = req.body.cId;
    var reason = req.body.reason;
    var query1 = "select * from report_product where cId = ? and pId=?;"
    connection.query(query1, [cId, pId], function (err, rows) {
        if (err) { 
            console.log(err);  
        } else {
            if (rows.length > 0) {
                res.render('reportProductForm', {
                    loggedIn: true,
                    pincode: req.cookies.pincode,
                    user: req.user,
                    pId: pId,
                    alreadyReported: true
                });
            } else {
                var query = "insert into report_product(pId,cId,reason) values(?,?,?)";
    connection.query(query, [pId, cId, reason], function (err, rows) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/productDetails/" + pId);
        }
    });
            }
        }

    });
    

});
app.get("/reportSeller/:sId", custCheckAuthenticated, function (req, res) {
    var sId = req.params.sId;
    console.log(req.user);
    res.render('reportSellerForm', {
        loggedIn: true,
        pincode: req.cookies.pincode,
        user: req.user,
        sId: sId,
        alreadyReported:false
    });
});


app.post('/reportSeller', custCheckAuthenticated, function (req, res) {
    var sId = req.body.sId;
    var cId = req.body.cId;
    var reason = req.body.reason;
    var query1 = "select * from report_seller where cId = ? and sId=?;"
    connection.query(query1, [cId, sId], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            if (rows.length > 0) {
                res.render('reportSellerForm', {
                    loggedIn: true,
                    pincode: req.cookies.pincode,
                    user: req.user,
                    sId: sId,
                    alreadyReported: true
                });
            } else {

    var query = "insert into report_seller(sId,cId,reason) values(?,?,?)";
    connection.query(query, [sId, cId, reason], function (err, rows) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/myorders");
        }
    });
            }  
        }
    
});
});


app.get("/getSellers/:pId", function (req, res) {
    var pin = req.cookies.pincode;
    var query = "SELECT b.bName,b.seller,b.bId,b.bWebsite,b.bCity,b.bState,b.bAddress,b.bMobile,i.iSize,i.sId, i.sellerPrice,i.iId, i.iDelivery, i.iDescription,ROUND(COALESCE(avg(sf.s_rating),0),1) as avg_rating from business_details b inner join inventory i on b.seller = i.sId left outer join seller_feedback sf on sf.seller_id= b.seller where i.pId = ? and b.bZip = ? group by b.seller order by i.sellerPrice";
    connection.query(query, [req.params.pId, pin], function (err, result) {
        if (err) {
            throw err;
        } else {
            var query2 = "select sf.s_review, sf.s_rating, cd.cName from seller_feedback sf inner join order_details od on sf.order_id = od.order_id inner join cust_details cd on sf.cust_id = cd.cId where sf.seller_id = ? and od.product_id=?;"
            connection.query(query2, [result[0].sId, req.params.pId], function (err, result1) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({
                        data1: result,
                        data2: result1,
                    });
                }
            })

        }
    });
});
app.get("/getSellersOnClick/:pId/:iId", function (req, res) {
    var query = "SELECT b.bName,b.bId,b.bWebsite,b.bCity,b.bState,b.bAddress,b.bMobile,i.iSize,i.sId, i.sellerPrice,i.iId, i.iDelivery, i.iDescription from business_details b inner join inventory i on b.seller = i.sId where i.pId = ? and i.iId = ? order by i.sellerPrice";
    connection.query(query, [req.params.pId, req.params.iId], function (err, result) {
        if (err) {
            throw err;
        } else {
            var query2 = "select sf.s_review, sf.s_rating, cd.cName from seller_feedback sf inner join order_details od on sf.order_id = od.order_id inner join cust_details cd on sf.cust_id = cd.cId where sf.seller_id = ? and od.product_id=?;"
            connection.query(query2, [result[0].sId, req.params.pId], function (err, result1) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({
                        data1: result,
                        data2: result1,
                    });
                }
            })
        }
    });
});


// orderpage.js Starts
app.post("/order", custCheckAuthenticated, function (req, res) {
    data = req.body;
    query1 = "Select i.sellerPrice,i.iDelivery,i.iDeliveryCharges,p.pId ,p.pName,p.pMrp,p.pPhotoId,p.pBrand,b.bName,b.seller, b.bId,b.bCity,b.bState,b.bAddress,b.bMobile from inventory i inner join products p on i.pId=p.pId inner join business_details b on b.seller = i.sId where i.iId=?";
    connection.query(query1, [parseInt(data.iId)], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render('orderPage', {
                key: process.env.RAZORPAY_KEY_ID,
                user: req.user,
                data: req.body,
                rows,
                loggedIn: true
            });
        }
    });
});

app.post("/placeOrder", custCheckAuthenticated, function (req, res) {
    var amount = req.body.amount;
    var options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "CORNERKART"
    };
    razorpay.orders.create(options, function (err, order) {
        res.json(order);
    });
});

app.post('/is-order-complete/:item/:order', custCheckAuthenticated, function (req, res) {
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDoc) => {
        if (paymentDoc.status == 'captured') {
            var item = JSON.parse(req.params.item);
            var order = JSON.parse(req.params.order);
            query1 = "INSERT INTO orders (delivery_address,order_zip,seller_id,cust_id,delivery_charges,total_amount,delivery_phone,order_status,del_fname,del_lname,paymentMethod,paymentStatus) values (?,?,?,?,?,?,?,?,?,?,?,?)";
            connection.query(query1, [order.dAddr, parseInt(req.cookies.pincode), parseInt(order.sellerId), parseInt(req.user.cId), parseInt(order.dcharges), parseFloat(order.total), parseInt(order.phone), "Awaiting Approval", order.fname, order.lname, "online", "Successfull"], function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    var saved = parseInt(item.mrp) * (parseInt(item.quantity)) - parseInt(item.amount);
                    query2 = "INSERT INTO order_details (order_id,product_id,product_qty,price,savedAmt,product_size,delivery_method,prod_status) VALUES (?,?,?,?,?,?,?,?)";
                    connection.query(query2, [rows.insertId, parseInt(item.pId), parseInt(item.quantity), parseInt(item.amount), saved, item.size, order.deliveryMethod, "Awaiting Approval"], function (err, rows2) {
                        if (err) {
                            console.log(err);
                        } else {
                            var time = paymentDoc.created_at;
                            query3 = "INSERT INTO order_payment_details (orderId,razorpayOrderId,razorpayPaymentId,paymentMethod,paymentEmail,paymentPhone,amount,paymentTimestamp) VALUES(?,?,?,?,?,?,?,FROM_UNIXTIME(?))";
                            connection.query(query3, [rows.insertId, paymentDoc.order_id, paymentDoc.id, paymentDoc.method, paymentDoc.email, parseInt(paymentDoc.contact), parseInt(paymentDoc.amount), time], function (err) {
                                if (err) {
                                    console.log(err);
                                } else {

                                    if (req.user) {
                                        pincode = req.cookies.pincode;
                                        if (req.user.role === 1) {
                                            res.render('thanksfororder', {
                                                orderId: rows.insertId,
                                                loggedIn: true,
                                                pincode: req.cookies.pincode,
                                                user: req.user
                                            });
                                        } else {
                                            res.redirect('/');
                                        }
                                    } else {
                                        res.redirect('/');
                                    }
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.send('Payment Failed!');
        }
    })
});

app.get("/myorders", custCheckAuthenticated, function (req, res) {

    if (req.user) {
        pincode = req.cookies.pincode;
        if (req.user.role === 1) {
            query = "SELECT p.pName,p.pBrand,p.isBan,p.pId,p.pPhotoId,b.bName,od.product_qty,o.order_id,o.total_amount,o.order_status,o.ordered_timestamp from products p inner join order_details od on p.pId = od.product_id inner join orders o on od.order_id=o.order_id inner join business_details b on b.seller=o.seller_id where o.cust_id=? order by o.ordered_timestamp desc";
            connection.query(query, [parseInt(req.user.cId)], function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('custOrderList', {
                        loggedIn: true,
                        pincode: req.cookies.pincode,
                        user: req.user,
                        rows
                    });
                }
            });
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/');
    }
});

app.get("/mywishlist", custCheckAuthenticated, function (req, res) {
    var query = "select pName,pBrand,pId, pPhotoId, pMrp from products where isBan=0 and pId in (select product_id from wishlist where cust_id = ?)";
    connection.query(query, [req.user.cId], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render('custWishlist', {
                loggedIn: true,
                pincode: req.cookies.pincode,
                user: req.user,
                rows
            });
        }
    });
});

app.get("/custOrderDetails/:order_id", custCheckAuthenticated, function (req, res) {
    query = "SELECT p.pName,p.pBrand,p.pId,p.pPhotoId,p.isBan,b.bName,b.bAddress,b.bMobile,b.seller,od.product_qty,od.product_size,od.price,o.order_id,o.delivered_timestamp,o.total_amount,o.del_fname,o.del_lname,o.delivery_address,o.delivery_phone,od.delivery_method,o.paymentStatus,o.order_status,o.ordered_timestamp,op.refundTimeStamp from products p inner join order_details od on p.pId = od.product_id inner join orders o on od.order_id=o.order_id inner join business_details b on b.seller=o.seller_id inner join order_payment_details op on op.orderId=o.order_id where o.order_id=?";
    connection.query(query, [parseInt(req.params.order_id)], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render('custOrderDetails', {
                loggedIn: true,
                pincode: req.cookies.pincode,
                user: req.user,
                rows
            });
        }
    });
});

app.get('/cancelOrder/:order_id', custCheckAuthenticated, function (req, res) {
    query = "UPDATE order_details set prod_status='Cancelled' where order_id=?";
    connection.query(query, [parseInt(req.params.order_id)], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            query = "UPDATE orders set order_status='Cancelled' where order_id=?";
            connection.query(query, [parseInt(req.params.order_id)], function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    var query3 = "SELECT razorpayPaymentId, amount from order_payment_details where orderId = ?"
                    connection.query(query3, [parseInt(req.params.order_id)], function (err, rows3) {
                        if (err) {
                            console.log(err);
                        } else {
                            razorpay.payments.refund(rows3[0].razorpayPaymentId, {
                                'amount': rows3[0].amount
                            }).then((result) => {
                                console.log("Refund : " + result.id + " TIME : " + result.created_at);
                                razorpay.refunds.fetch(result.id, {
                                    'payment_id': result.payment_id
                                }).then((refundResult) => {
                                    if (refundResult.status == "processed") {
                                        var query4 = "update order_payment_details set refundId = ?, refundTimeStamp = FROM_UNIXTIME(?) where orderId = ?"
                                        connection.query(query4, [refundResult.id, refundResult.created_at, parseInt(req.params.order_id)], function (err) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                var query5 = "update orders set paymentStatus = 'Refunded' where order_id = ?"
                                                connection.query(query5, [parseInt(req.params.order_id)], function (err) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {

                                                        res.redirect("/custOrderDetails/" + req.params.order_id);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }).catch((err) => {
                                console.log("Refund not successfull: " + err);
                            });
                        }
                    });
                }
            })
        }
    });
});


app.post("/searchtag", function (req, res) {
    query = "select i.pId,p.pName,p.pBrand,p.pPhotoId,p.pMrp,min(i.sellerPrice) as price from inventory i inner join business_details bd on i.sId=bd.seller inner join products p on i.pId=p.pId where p.isBan=0 and iTags like '%" + req.body.searchQueryInput + "%' and bd.bZip=? group by i.pId";
    connection.query(query, [parseInt(req.cookies.pincode)], function (err, rows1) {
        if (err) {
            console.log(err);
        } else {

            if (req.user) {
                pincode = req.cookies.pincode;
                if (req.user.role === 1) {
                    res.render('productPage0', {
                        rows1,
                        searchquery: req.body.searchQueryInput,
                        loggedIn: true,
                        pincode: req.cookies.pincode,
                        user: req.user
                    });
                } else {
                    res.render('productPage0', {
                        rows1,
                        searchquery: req.body.searchQueryInput,
                        pincode: req.cookies.pincode,
                        loggedIn: false
                    });
                }
            } else {
                res.render('productPage0', {
                    rows1,
                    searchquery: req.body.searchQueryInput,
                    pincode: req.cookies.pincode,
                    loggedIn: false
                });
            }
        }
    });
});


app.get("/changepincodesearch", function (req, res) {
    res.clearCookie("pincode");
    if (req.user) {
        if (req.user.role == 1) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

app.get("/invoice/:order_id", custCheckAuthenticated, function (req, res) {
    query = "Select o.order_id, o.total_amount, o.ordered_timestamp, o.delivered_timestamp, od.product_id, od.product_qty, od.price, bd.bName, bd.bGST, bd.bMobile, bd.bAddress, bd.bCity, bd.bZip, bd.bState, s.sPAN, c.cName, c.cMobile, c.cPincode, p.pBrand, p.pName from orders o inner join order_details od on o.order_id=od.order_id inner join products p on p.pId = od.product_id inner join seller_details s on s.sId = o.seller_id inner join business_details bd on bd.seller=o.seller_id inner join cust_details c on c.cId = o.cust_id where o.order_id=? ";
    connection.query(query, [req.params.order_id], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render('receipt', {
                rows
            });
        }
    })
});

app.get("/custOrderDetails/:order_id/feedback", custCheckAuthenticated, function (req, res) {
    sflag = 0;
    pflag = 0;
    orderId = req.params.order_id;
    query = "Select o.cust_id, od.product_id, o.seller_id from orders o join order_details od on o.order_id = od.order_id where o.order_id = ?";
    connection.query(query, [req.params.order_id], function (err, rows) {
        if (err) {
            console.log(err);
        } else {

            if (req.user.cId === rows[0].cust_id) {
                var query2 = "Select * from product_feedback where pId = ? and cId = ?";
                connection.query(query2, [rows[0].product_id, rows[0].cust_id], function (err, rows2) {
                    if (err) {
                        console.log(err)
                    } else {
                        if (!rows2[0]) {
                            pflag = 0;
                        } else {
                            pflag = 1;
                        }
                    }
                    var query3 = "Select * from seller_feedback where seller_id = ? and cust_id = ? and order_id=?";
                    connection.query(query3, [rows[0].seller_id, rows[0].cust_id, orderId], function (err, rows3) {
                        if (err) {
                            console.log(err);
                        } else {

                            if (!rows3[0]) {
                                sflag = 0;

                            } else {
                                sflag = 1;
                            }
                        }
                        var query4 = "Select p.pPhotoId,p.pName,p.pBrand,b.bName,b.bPhotoId from products p,business_details b where p.pId=? and b.seller=?";
                        connection.query(query4, [rows[0].product_id, rows[0].seller_id], function (err, rows4) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (sflag == 0 && pflag == 0) {
                                    res.render('feedback', {
                                        loggedIn: true,
                                        pincode: req.cookies.pincode,
                                        user: req.user,
                                        orderid: req.params.order_id,
                                        srating: 0,
                                        sreview: "",
                                        prating: 0,
                                        preview: "",
                                        rows4
                                    });
                                } else if (sflag == 0 && pflag == 1) {
                                    res.render('feedback', {
                                        loggedIn: true,
                                        pincode: req.cookies.pincode,
                                        user: req.user,
                                        orderid: req.params.order_id,
                                        srating: 0,
                                        sreview: "",
                                        prating: rows2[0].p_rating,
                                        preview: rows2[0].p_review,
                                        rows4
                                    });
                                } else if (sflag == 1 && pflag == 0) {
                                    res.render('feedback', {
                                        loggedIn: true,
                                        pincode: req.cookies.pincode,
                                        user: req.user,
                                        orderid: req.params.order_id,
                                        srating: rows3[0].s_rating,
                                        sreview: rows3[0].s_review,
                                        prating: 0,
                                        preview: "",
                                        rows4
                                    });
                                } else if (sflag == 1 && pflag == 1) {

                                    res.render('feedback', {
                                        loggedIn: true,
                                        pincode: req.cookies.pincode,
                                        user: req.user,
                                        orderid: req.params.order_id,
                                        srating: rows3[0].s_rating,
                                        sreview: rows3[0].s_review,
                                        prating: rows2[0].p_rating,
                                        preview: rows2[0].p_review,
                                        rows4

                                    });
                                }
                            }
                        })

                    });
                });
            }
        }
    });
});

app.post('/feedback/product/submit', custCheckAuthenticated, function (req, res) {
    var p_rating = req.body.p_rating;
    var p_comment = req.body.p_comment;
    var orderId = req.body.order_id;
    var cId = req.user.cId;
    var query = "Select product_id from order_details where order_id = ?";
    connection.query(query, [orderId], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "select cId from product_feedback where pId = ? and cId=?";
            connection.query(query2, [rows[0].product_id, cId], function (err, rows2) {
                if (err) {
                    console.log(err);
                } else {
                    if (!rows2[0]) {

                        var query3 = "Insert into product_feedback (pId, order_id, cId, p_rating, p_review) values (?,?,?,?,?)";
                        connection.query(query3, [rows[0].product_id, orderId, cId, p_rating, p_comment], function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/myorders");
                                // res.redirect("/custOrderDetails/" + req.body.order_id + "/feedback");
                            }
                        });
                    } else {
                        var query4 = "Update product_feedback set p_rating = ?, p_review = ? where cId = ? and pId = ?";
                        connection.query(query4, [p_rating, p_comment, cId, rows[0].product_id], function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(p_comment, p_rating);
                                res.redirect("/myorders");
                            }
                        });
                    }
                }

            });

        }
    });



});

app.post('/feedback/seller/submit', custCheckAuthenticated, function (req, res) {
    var s_rating = req.body.s_rating;
    var s_comment = req.body.s_comment;

    var orderId = req.body.order_id;
    var cId = req.user.cId;
    var query = "Select seller_id from orders where order_id = ?";
    connection.query(query, [orderId], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "select cust_id from seller_feedback where seller_id = ? and cust_id= ? and order_id=?"
            connection.query(query2, [rows[0].seller_id, cId, orderId], function (err, rows2) {
                if (err) {
                    console.log(err);
                } else {

                    if (!rows2[0]) {
                        var query3 = "Insert into seller_feedback (seller_id, s_review, s_rating, order_id, cust_id) values (?,?,?,?,?)";
                        connection.query(query3, [rows[0].seller_id, s_comment, s_rating, orderId, cId], function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(s_comment);
                                res.redirect("/myorders");
                            }
                        });
                    } else {
                        var query4 = "Update seller_feedback set s_rating = ?, s_review = ? where cust_id = ? and seller_id = ? and order_id=?";
                        connection.query(query4, [s_rating, s_comment, cId, rows[0].seller_id, orderId], function (err) {
                            if (err) {
                                console.log(err);
                            } else {

                                res.redirect("/myorders");
                            }
                        });

                    }
                }
            });
        }
    });
});


//Wishlist
app.post("/addToWishlist/:pId", custCheckAuthenticated, function (req, res) {
    wish_products = req.body.wish_products;

    wish_products.forEach(function (product) {
        var query = "insert into wishlist values(?,?)"
        connection.query(query, [req.user.cId, product], (err) => {
        })
    })
    res.redirect("/productDetails/" + req.params.pId);
})

app.post("/removeFromWishlist/:pId", custCheckAuthenticated, function (req, res) {
    removeProductId = req.params.pId;

    var query = "Delete from wishlist where cust_id = ? and product_id = ?";
    connection.query(query, [req.user.cId, removeProductId], function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/productDetails/" + removeProductId);
        }
    });
});

app.post("/addToWishlistremote", custCheckAuthenticated, function (req, res) {
    var products = req.body.wish_products;

    products.forEach(function (product) {
        var query = "insert into wishlist values(?,?)"
        connection.query(query, [req.user.cId, product], (err) => {
        })
    })

    res.status(200);
    res.sendStatus(200);
});

app.post('/getLastViewedDetails', function (req, res) {
    var productsArray = req.body.last_viewed;
    var query = "SELECT p.pId,p.pName,p.pMrp,p.pPhotoId,p.pBrand,min(i.sellerPrice) as minPrice FROM products p inner join inventory i on p.pId=i.pId inner join business_details b on i.sId=b.seller where p.isBan=0 and b.bZip=? and p.pId in (?) group by p.pId ORDER BY FIELD(p.pId, ?)";
    connection.query(query, [req.cookies.pincode, productsArray, productsArray], function (err, rows) {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ 'prodDetails': rows });
        }
    })
})

app.post('/recommended_lastviewed', function (req, res) {
    var productsArray = req.body.last_viewed;
    var query = "select t2.pId,t2.max_avg, t2.pCategory,t2.pName,t2.pBrand,t2.pPhotoId, min(i.sellerPrice) as min from (select a.pId, max(a.average) as max_avg,a.pCategory,a.pName,a.pBrand,a.pMrp,a.pPhotoId from (select pf.pId,avg(pf.p_rating) average,p.pCategory,p.pName,p.pBrand,p.pMrp,p.pPhotoId from product_feedback pf inner join products p on p.pId=pf.pId where p.isBan=0 and pf.pId in (?) group by pId order by average desc) as a group by a.pCategory) as t2 inner join inventory i on i.pId  = t2.pId inner join business_details b on b.seller = i.sId where  b.bZip = ? group by i.pId;";
    connection.query(query, [productsArray, req.cookies.pincode], function (err, rows) {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ 'prodDetails': rows });
        }
    })
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
                                        // res.status(200).send(publicUrl);
                                    });
                                    blobStream.end(req.files.bShop_photo[0].buffer);
                                    connection.query("Update business_details set bPhotoId = ? where bId = ?", [blob.id, rows3[0].bId], function (err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            // func.sendmail(data.bEmail);
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
            query = "SELECT count(order_id) as total_orders,(select count(order_id) from orders where order_status='Accepted, In-progress' and seller_id=?) as pending_orders,(select count(order_id) from orders where order_status='Awaiting Approval' and seller_id=?) as new_orders,(select sum(total_amount) from orders where order_status='Order Completed' and seller_id=?) as total_amount from orders where seller_id=?;";
            connection.query(query, [req.user.sId, req.user.sId, req.user.sId, req.user.sId], function (err, rows1) {
                if (err) {
                    console.log(err);
                } else {
                    query2 = "Select o.order_id,o.total_amount,od.product_qty,od.delivery_method from orders o inner join order_details od on o.order_id=od.order_id where o.order_status='Awaiting Approval' and o.seller_id=? order by o.ordered_timestamp desc limit 8";
                    connection.query(query2, [req.user.sId], function (err, rows2) {
                        if (err) {
                            console.log(err);
                        } else {
                            query3 = "Select o.order_id,o.total_amount,od.product_qty,od.delivery_method from orders o inner join order_details od on o.order_id=od.order_id where o.order_status='Accepted, In-progress' and o.seller_id=? order by o.ordered_timestamp desc limit 8"
                            connection.query(query3, [req.user.sId], function (err, rows3) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    query4 = "SELECT count(od.product_id) as count,p.pName,p.pBrand,p.pPhotoId from order_details od inner join products p on od.product_id=p.pId inner join orders o on o.order_id=od.order_id where o.seller_id=? and o.order_status != 'Cancelled' group by product_id order by count desc;"
                                    connection.query(query4, [req.user.sId], function (err, rows4) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            query5 = 'SELECT count(order_id) as count,order_status as status from orders where seller_id = ?  and DATEDIFF(current_timestamp,ordered_timestamp)<31 group by order_status;';
                                            connection.query(query5, [req.user.sId], function (err, rows5) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    res.render('dashboard', {
                                                        name: req.user.sName,
                                                        source: rows[0].bPhotoId,
                                                        rows1,
                                                        rows2,
                                                        rows3,
                                                        rows4,
                                                        rows5
                                                    });
                                                }
                                            });
                                        }
                                    });

                                }
                            });
                        }
                    });
                }
            });
        }
    })
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
    var size = null;
    var deliveryCharges = parseInt(pDetails.pDeliveryCharges);
    if (pDetails.clothesSize != undefined) {
        if (pDetails.clothesSize.toString().split(",").length > 1) {
            size = (pDetails.clothesSize).join();

        } else {
            size = pDetails.clothesSize;

        }

    } else if (pDetails.shoesSize != undefined) {
        size = (pDetails.shoesSize).join();
    }
    var sId = req.user.sId;
    var query99 = "Select * from business_details where seller=?";
    connection.query(query99, [parseInt(sId)], function (err, rows99) {
        if (err) {
            console.log(err);
        } else {
            var query = "SELECT * FROM products WHERE pName = ? and pBrand = ?";
            connection.query(query, [pDetails.pName, pDetails.pBrand], function (err, rows) {
                if (err) {
                    console.log(err);
                } else if (rows.length) {
                    query10 = "Select c.catName,sc.subCatName from product_subcategories sc inner join product_categories c on sc.catId=c.catId where sc.subCatId=?";
                    connection.query(query10, [parseInt(pDetails.pSubCategory)], function (err, rows10) {
                        if (err) {
                            console.log(err);
                        } else {


                            var tag = pDetails.pBrand + ' ' + pDetails.pName + ' ' + rows10[0].subCatName + ' ' + rows10[0].catName + ' ' + rows99[0].bName;
                            connection.query("INSERT INTO inventory (sellerPrice,stockAvailable,sId,pId,iDelivery,iDescription,iSize,iDeliveryCharges,iTags) VALUES(?,?,?,?,?,?,?,?,?)", [parseFloat(pDetails.pPrice), parseInt(pDetails.pQuantity), sId, rows[0].pId, pDetails.pDelivery, pDetails.pDescription, size, deliveryCharges, tag], function (err) {
                                if (err) {
                                    console.log(err);
                                } else {

                                    res.redirect("/myproducts");
                                }
                            })
                        }

                    });

                } else {
                    var subCat = parseInt(pDetails.pSubCategory);

                    var q = "INSERT INTO products (pName,pMrp,pCategory,pSubCategory,pBrand) VALUES(?,?,?,?,?)";
                    if (subCat === -1) {
                        var values = [pDetails.pName, parseFloat(pDetails.pMRP), parseInt(pDetails.pCategory), 3000259, pDetails.pBrand];
                    } else {
                        var values = [pDetails.pName, parseFloat(pDetails.pMRP), parseInt(pDetails.pCategory), parseInt(pDetails.pSubCategory), pDetails.pBrand]

                    }
                    connection.query(q, values, function (err) {
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

                                        // res.status(200).send(publicUrl);
                                    });
                                    blobStream.end(req.files.product_photo[0].buffer);



                                    var query3 = "UPDATE products SET pPhotoId = ? WHERE pId = ?";
                                    connection.query(query3, [blob.id, rows2[0].pId], function (err) {
                                        if (err) {
                                            console.log(err);
                                        } else {

                                        }
                                    });
                                }
                            });
                            var query = "SELECT * FROM products WHERE pName = ? and pBrand = ?";
                            connection.query(query, [pDetails.pName, pDetails.pBrand], function (err, rows) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    query10 = "Select c.catName,sc.subCatName from product_subcategories sc inner join product_categories c on sc.catId=c.catId where sc.subCatId=?";
                                    connection.query(query10, [parseInt(pDetails.pSubCategory)], function (err, rows10) {
                                        if (err) {
                                            console.log(err);
                                        } else {


                                            var tag = pDetails.pBrand + ' ' + pDetails.pName + ' ' + rows10[0].subCatName + ' ' + rows10[0].catName + ' ' + rows99[0].bName;
                                            connection.query("INSERT INTO inventory (sellerPrice,stockAvailable,sId,pId,iDelivery,iDescription,iSize,iDeliveryCharges,iTags) VALUES(?,?,?,?,?,?,?,?,?)", [parseFloat(pDetails.pPrice), parseInt(pDetails.pQuantity), sId, rows[0].pId, pDetails.pDelivery, pDetails.pDescription, size, deliveryCharges, tag], function (err) {
                                                if (err) {
                                                    console.log(err);
                                                } else {

                                                    res.redirect("/myproducts");
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
    var query = "SELECT p.pId,p.pSubCategory,p.pBrand,p.pName,p.isBan,p.pMrp,p.pCategory,c.catName,sc.subCatName,p.pPhotoId,i.iDeliveryCharges,i.iId,i.sellerPrice,i.stockAvailable,i.iDelivery from products p inner join inventory i on p.pId = i.pId inner join product_categories c on c.catId = p.pCategory inner join product_subcategories sc on sc.subCatId = p.pSubCategory where i.sId = ? "
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


    var inventid = req.body.deleteproduct;
    var query4 = "delete from inventory where iId=?";
    connection.query(query4, inventid, function (err, rows) {
        if (err) {
            console.log(err);
        } else {

            res.redirect('/myproducts');
        }
    })
    if (req.body.name === "undefined") {
        res.redirect('/business')
    }
})

app.post("/editProduct", checkAuthenticated, function (req, res) {
    var query = "SELECT p.pId,p.pSubCategory,p.pBrand,p.isBan,p.pName,p.pMrp,p.pCategory,c.catName,sc.subCatName,p.pPhotoId,i.iId,i.iDeliveryCharges,i.sellerPrice,i.stockAvailable,i.iDelivery from products p inner join inventory i on p.pId = i.pId inner join product_categories c on c.catId = p.pCategory inner join product_subcategories sc on sc.subCatId = p.pSubCategory where p.isBan=0 and i.sId = ? "
    var photos = [];
    var editValue = req.body.editbtn;


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
    var query = "UPDATE inventory i SET i.stockAvailable = ? , i.sellerPrice = ? , i.iDelivery = ?, i.iDeliveryCharges = ? where iId = ?";

    connection.query(query, [parseInt(data.stockAvailable), parseFloat(data.sellerPrice), data.iDelivery, parseInt(data.pDeliveryCharges), parseInt(data.savebtn)], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var query = "SELECT p.pId,p.pSubCategory,p.pBrand,p.pName,p.pMrp,p.pCategory,c.catName,sc.subCatName,p.pPhotoId,i.iDeliveryCharges,i.iId,i.sellerPrice,i.stockAvailable,i.iDelivery from products p inner join inventory i on p.pId = i.pId inner join product_categories c on c.catId = p.pCategory inner join product_subcategories sc on sc.subCatId = p.pSubCategory where i.sId = ? "

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

app.get('/sellerOrders', checkAuthenticated, function (req, res) {
    var query = "SELECT o.order_id,o.total_amount,od.delivery_method,o.ordered_timestamp,o.order_status from orders o inner join order_details od on o.order_id = od.order_id where o.seller_id = ?"
    connection.query(query, req.user.sId, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "Select s.sName,b.bPhotoId from seller_details s inner join business_details b on s.sId=b.seller where s.sId=?";

            connection.query(query2, req.user.sId, function (err, rows1) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('sellerOrders', {
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
app.get('/sellerOrdersDetail/:order_id', checkAuthenticated, function (req, res) {
    var query = "SELECT o.order_id,o.total_amount,o.delivery_address,o.order_zip,o.cust_id,o.delivery_charges,o.delivery_phone,o.del_fname,o.del_lname,o.paymentMethod,o.paymentStatus,o.ordered_timestamp,o.order_status,od.delivery_method,od.product_id,od.product_qty,od.price,od.product_size,od.delivery_method,c.cName,c.cEmail,c.cMobile,p.pName,p.pBrand,p.pPhotoId,p.isBan,p.pId,pay.refundTimeStamp from orders o inner join order_details od on o.order_id = od.order_id inner join cust_details c on o.cust_id = c.cId inner join products p on od.product_id = p.pId inner join order_payment_details pay on o.order_id = pay.orderId where o.seller_id = ? and o.order_id = ?"
    connection.query(query, [req.user.sId, req.params.order_id], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "Select s.sName,b.bPhotoId from seller_details s inner join business_details b on s.sId=b.seller where s.sId=?";
            connection.query(query2, req.user.sId, function (err, rows1) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('sellerOrdersDetail', {
                        rows,
                        name: rows1[0].sName,
                        source: rows1[0].bPhotoId
                    })
                }
            });
        }
    });
});

app.post('/acceptOrder', checkAuthenticated, function (req, res) {
    var cId = req.body.cId;
    var pId = req.body.pId;
    var query = "update orders set order_status = 'Accepted, In-progress' where order_id = ?";
    connection.query(query, parseInt(req.body.orderId), function (err) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "update order_details set prod_status = 'Accepted, In-progress' where order_id = ?"
            connection.query(query2, parseInt(req.body.orderId), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    var query3 = 'select * from customer_subscription where cId = ?';
                    connection.query(query3, cId, function (err, rows) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (rows[0]) {
                                subscription = JSON.parse(rows[0].subscription);
                                console.log(subscription);
                                var query4 = "select pPhotoId from products where pId = ?";
                                var payload;
                                connection.query(query4, pId, function (err, rows1) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {

                                    }
                                })
                                payload = JSON.stringify({
                                    title: 'Order Accepted',
                                    body: 'Your order has been accepted by the seller. Please wait for the seller to deliver the product.',
                                    icon: 'https://firebasestorage.googleapis.com/v0/b/cornerkart-cd3d7.appspot.com/o/Product%2F50058-photo.jpeg',
                                    url: '/custOrderDetails/' + req.body.orderId,
                                });
                                webpush.sendNotification(subscription, payload).catch(err => console.log(err));
                            }
                        }
                    })
                    res.redirect("/sellerOrdersDetail/" + req.body.orderId);
                }
            });
        }
    });
});
var request = require('request');
const {
    connect
} = require('tls');
app.post('/rejectOrder', checkAuthenticated, function (req, res) {
    var pId = req.body.pId;
    var cId = req.body.cId;
    var subscription1;
    var query = "update orders set order_status = 'Rejected' , seller_comment = ? where order_id = ?"
    connection.query(query, [req.body.reason, parseInt(req.body.orderId)], function (err) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "update order_details set prod_status = 'Rejected' where order_id = ?"
            connection.query(query2, [parseInt(req.body.orderId)], function (err) {
                if (err) {
                    console.log(err);
                } else {
                    var query3 = "SELECT razorpayPaymentId, amount from order_payment_details where orderId = ?"
                    connection.query(query3, [parseInt(req.body.orderId)], function (err, rows3) {
                        if (err) {
                            console.log(err);
                        } else {
                            razorpay.payments.refund(rows3[0].razorpayPaymentId, {
                                'amount': rows3[0].amount
                            }).then((result) => {
                                console.log("Refund : " + result.id + " TIME : " + result.created_at);
                                razorpay.refunds.fetch(result.id, {
                                    'payment_id': result.payment_id
                                }).then((refundResult) => {
                                    if (refundResult.status == "processed") {
                                        var query4 = "update order_payment_details set refundId = ?, refundTimeStamp = FROM_UNIXTIME(?) where orderId = ?"
                                        connection.query(query4, [refundResult.id, refundResult.created_at, parseInt(req.body.orderId)], function (err) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                var query5 = "update orders set paymentStatus = 'Refunded' where order_id = ?"
                                                connection.query(query5, [parseInt(req.body.orderId)], function (err) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        console.log("Refund Successfull");
                                                        //Sending Notification
                                                        var query3 = 'select * from customer_subscription where cId = ?';
                                                        connection.query(query3, cId, function (err, rows) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                if (rows[0]) {
                                                                    subscription = JSON.parse(rows[0].subscription);
                                                                    console.log(subscription);
                                                                    var query4 = "select pPhotoId from products where pId = ?";
                                                                    var payload;
                                                                    connection.query(query4, pId, function (err, rows1) {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        }
                                                                        else {

                                                                        }
                                                                    })
                                                                    payload = JSON.stringify({
                                                                        title: 'Order Rejected',
                                                                        body: 'Your order has been rejected by the seller.\n Reason: ' + req.body.reason + '\nRefund will be initiated shortly.',
                                                                        icon: 'https://firebasestorage.googleapis.com/v0/b/cornerkart-cd3d7.appspot.com/o/Product%2F50058-photo.jpeg',
                                                                        url: '/custOrderDetails/' + req.body.orderId,
                                                                    });
                                                                    subscription1 = subscription;
                                                                    webpush.sendNotification(subscription, payload).catch(err => console.log(err));
                                                                }
                                                            }
                                                        })
                                                        res.redirect("/sellerOrdersDetail/" + req.body.orderId);

                                                    }
                                                });
                                            }
                                        });
                                        payload = JSON.stringify({
                                            title: 'Amount Refunded',
                                            body: 'Refund for rejected order is initiated. Amount will reflect in your bank account in 4-5 working days.',
                                            icon: 'https://firebasestorage.googleapis.com/v0/b/cornerkart-cd3d7.appspot.com/o/Product%2F50058-photo.jpeg',
                                            url: '/custOrderDetails/' + req.body.orderId,
                                        });
                                        webpush.sendNotification(subscription1, payload).catch(err => console.log(err));
                                    }
                                });

                            }).catch((err) => {
                                console.log("Refund not successfull: " + err);
                            });
                        }
                    });
                }
            });
        }
    });
});
app.get('/deliveredOrder/:orderId', checkAuthenticated, function (req, res) {
    var query = "update orders set order_status = 'Order Completed',delivered_timestamp = current_timestamp where order_id = ?";
    connection.query(query, [parseInt(req.params.orderId)], function (err) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "update order_details set prod_status = 'Order Completed' where order_id = ?";
            connection.query(query2, [parseInt(req.params.orderId)], function (err) {
                if (err) {
                    console.log(err);
                } else {
                    connection.query('select cust_id from orders where order_id=?', [parseInt(req.params.orderId)], function (err, rows) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            var cId = rows[0].cust_id;
                            var query3 = 'select * from customer_subscription where cId = ?';
                            connection.query(query3, cId, function (err, rows) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (rows[0]) {
                                        subscription = JSON.parse(rows[0].subscription);
                                        // console.log(subscription);
                                        var payload;
                                        payload = JSON.stringify({
                                            title: 'Order Delivered',
                                            body: 'Your order has been delivered. Thank you for shopping with us.',
                                            icon: 'https://firebasestorage.googleapis.com/v0/b/cornerkart-cd3d7.appspot.com/o/Product%2F50058-photo.jpeg',
                                            url: '/custOrderDetails/' + req.body.orderId,
                                        });
                                        webpush.sendNotification(subscription, payload).catch(err => console.log(err));
                                    }
                                }
                            })
                        }
                    })
                    res.sendStatus(200);
                }
            });
        }
    });
});


app.get("/sellerFeedbacks", checkAuthenticated, function (req, res) {
    var query1 = "Select s.sName,b.bPhotoId,s.sId from seller_details s inner join business_details b on s.sId=b.seller where s.sId=?";
    connection.query(query1, req.user.sId, function (err, rows1) {
        if (err) {
            console.log(err);
        } else {
            var query2 = "select sf.s_review, sf.s_rating, cd.cName,od.order_id, p.pId, p.pPhotoId, p.pName, p.pBrand from seller_feedback sf inner join order_details od on sf.order_id = od.order_id inner join cust_details cd on sf.cust_id = cd.cId inner join products p on p.pId = od.product_id where sf.seller_id = ?";
            connection.query(query2, [rows1[0].sId], function (err, rows2) {
                res.render('seller_feedback', {
                    name: rows1[0].sName,
                    source: rows1[0].bPhotoId,
                    rows2
                })
            })
        }
    });
});


//myproducts.ejs ends

/************************************Seller Ends*************************************************/



/************************************Admin Starts*************************************************/




app.get("/adminLogin", adminCheckNotAuthenticated, function (req, res) {
    res.render("adminLogin");
});

app.post('/adminLogin', adminCheckNotAuthenticated, passport.authenticate('adminLocal', {
    successRedirect: '/adminDashboard',
    failureRedirect: '/adminloginfail',
    failureFlash: true
}));
app.get('/adminloginfail', function (req, res) {
    res.render("adminLogin", {
        err: "Incorrect Admin ID or Password"
    });
});

app.get("/adminDashboard", adminCheckAuthenticated, function (req, res) {
    res.render("adminDashboard");
});

app.get("/admingetProducts", adminCheckAuthenticated, function (req, res) {
    var query = "select * from products p inner join product_categories c on p.pCategory=c.catId inner join product_subcategories s on p.pSubCategory=s.subCatId";
    connection.query(query, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render("admingetProducts", {
                rows
            });
        }
    });
});
function cancelOrderViaAdmin(order_id) {
    query = "UPDATE order_details set prod_status='Cancelled' where order_id=?";
    connection.query(query, [parseInt(order_id)], function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            query = "UPDATE orders set order_status='Cancelled' where order_id=?";
            connection.query(query, [parseInt(order_id)], function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    var query3 = "SELECT razorpayPaymentId, amount from order_payment_details where orderId = ?"
                    connection.query(query3, [parseInt(order_id)], function (err, rows3) {
                        if (err) {
                            console.log(err);
                        } else {
                            razorpay.payments.refund(rows3[0].razorpayPaymentId, {
                                'amount': rows3[0].amount
                            }).then((result) => {
                                console.log("Refund : " + result.id + " TIME : " + result.created_at);
                                razorpay.refunds.fetch(result.id, {
                                    'payment_id': result.payment_id
                                }).then((refundResult) => {
                                    if (refundResult.status == "processed") {
                                        var query4 = "update order_payment_details set refundId = ?, refundTimeStamp = FROM_UNIXTIME(?) where orderId = ?"
                                        connection.query(query4, [refundResult.id, refundResult.created_at, parseInt(order_id)], function (err) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                var query5 = "update orders set paymentStatus = 'Refunded' where order_id = ?"
                                                connection.query(query5, [parseInt(order_id)], function (err) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        var query6 = "select cust_id, seller_id from orders where order_id=?";
                                                        connection.query(query6, [order_id], function (err, rows6) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                var query7 = "select subscription from customer_subscription where cId=?";
                                                                connection.query(query7, rows6[0].cust_id, function (err, rows7) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    } else {
                                                                        var subscription = JSON.parse(rows7[0].subscription);
                                                                        var payload;
                                                                        payload = JSON.stringify({
                                                                            title: 'Ordered product has been banned.',
                                                                            body: 'Your ordered product has been banned from our platform and your order is cancelled. If payment is done, refund will be initiated shortly. Please contact us for further details.',
                                                                            icon: 'https://firebasestorage.googleapis.com/v0/b/cornerkart-cd3d7.appspot.com/o/Product%2F50058-photo.jpeg',
                                                                            url: '/custOrderDetails/' + order_id,
                                                                        });
                                                                        webpush.sendNotification(subscription, payload).catch(err => console.log(err));
                                                                    }
                                                                });
                                                                var query8 = "select subscription from seller_subscription where sId=?";
                                                                connection.query(query8, rows6[0].seller_id, function (err, rows8) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    } else {
                                                                        var subscription = JSON.parse(rows8[0].subscription);
                                                                        var payload;
                                                                        payload = JSON.stringify({
                                                                            title: 'Product has been banned.',
                                                                            body: 'All orders of your banned product have been cancelled.',
                                                                            icon: 'https://firebasestorage.googleapis.com/v0/b/cornerkart-cd3d7.appspot.com/o/Product%2F50058-photo.jpeg',
                                                                            url: '/custOrderDetails/' + order_id,
                                                                        });
                                                                        webpush.sendNotification(subscription, payload).catch(err => console.log(err));
                                                                    }
                                                                });

                                                            }
                                                        });
                                                        return;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }).catch((err) => {
                                console.log("Refund not successfull: " + err);
                            });
                        }
                    });
                }
            })
        }
    });
}



app.post('/banProduct', adminCheckAuthenticated, function (req, res) {
    var pId = req.body.banProduct;
    console.log("pid : " + pId);

    var query = "update products set isBan = 1 where pId = ?";
    connection.query(query, [pId], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            var query2 = "select order_id from order_details where product_id=? and (prod_status='Accepted, In-progress' or prod_status='Awaiting Approval')";
            connection.query(query2, [pId], function (err, rows1) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rows1);
                    if (rows1.length > 0) {

                        console.log("Orders are cancelled.");
                        for (i = 0; i < rows1.length; i++) {

                            cancelOrderViaAdmin(rows1[i].order_id);
                        }

                        res.redirect("/admingetProducts");
                    } else {
                        res.redirect("/admingetProducts");
                    }
                }
            });
        }

    });
});

app.get("/admingetUsers", adminCheckAuthenticated, function (req, res) {
    var query = "Select * from cust_details"
    connection.query(query, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render("admingetUsers", { rows });
        }
    });
});

app.post('/banCustomers', adminCheckAuthenticated, function (req, res) {
    var cId = req.body.banCustomer;
    console.log("cid : " + cId);

    var query = "update cust_details set isBan = 1 where cId = ?";
    connection.query(query, [pId], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            var query2 = "select order_id from order_details where product_id=? and (prod_status='Accepted, In-progress' or prod_status='Awaiting Approval')";
            connection.query(query2, [pId], function (err, rows1) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rows1);
                    if (rows1.length > 0) {

                        console.log("Orders are cancelled.");
                        for (i = 0; i < rows1.length; i++) {

                            cancelOrderViaAdmin(rows1[i].order_id);
                        }

                        res.redirect("/admingetProducts");
                    } else {
                        res.redirect("/admingetProducts");
                    }
                }
            });
        }

    });
});


app.get("/admingetSellers", adminCheckAuthenticated, function (req, res) {
    res.render("admingetSellers");
});

app.get("/dismissProduct/:pId", adminCheckAuthenticated, function (req, res) {
    //var pId = req.body.dismissproduct;
    //console.log("pid : " + pId);

    var query = "update report_product set isDismissed = 1 where pId = ?";
    connection.query(query, [req.params.pId], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/adminproductComplaint");
        }

    });

});

app.get("/dismissSeller/:sId",adminCheckAuthenticated, function (req, res) {
    //var pId = req.body.dismissproduct;
    //console.log("pid : " + pId);

    var query = "update report_seller set isDismissed = 1 where sId = ?";
    connection.query(query, [req.params.sId], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/adminsellerComplaint");
        }

    });
    
});

app.get("/adminproductComplaint", adminCheckAuthenticated, function (req, res) {
    var query = "select p.pId,p.pName,p.pPhotoId,p.pBrand,r.cId,r.reason,r.isDismissed,p.isBan from products p inner join report_product r on r.pId = p.pId where r.isDismissed = 0";
    connection.query(query, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render("adminproductComplaint", {
                rows
            });
        }
    });
});

app.get("/adminsellerComplaint", adminCheckAuthenticated, function (req, res) {
    var query = "select s.sId,s.sName,s.sPhoneNo,s.sZip,r.cId,r.reason,r.isDismissed,s.isBan from seller_details s inner join report_seller r on r.sId = s.sId where r.isDismissed = 0";
    connection.query(query, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.render("adminsellerComplaint", {
                rows
            });
        }
    });
});

/************************************Admin Ends*************************************************/


app.listen(process.env.PORT || 3000, function () {
    console.log("Connected at 3000");
});

