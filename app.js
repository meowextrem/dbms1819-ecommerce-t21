var express = require('express');
var exphbs = require('express-handlebars'); // "express-handlebars"
var nodeMailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var bodyParser = require('body-parser');
var Handlebars = require('handlebars');
var MomentHandler = require('handlebars.moment');
MomentHandler.registerHelpers(Handlebars);
var path = require('path');
var app = express();
var { Client } = require('pg');
var port = process.env.PORT || 3000;
var client = new Client({
  database: 'dd1ictctqi0cm3',
  user: 'oxhzdvnaspxdtt',
  password: 'd90fcd2cdd91a8ba06b2ac72f68f0cca6e9eb38bde8d4eb08e6d92b504514cb9',
  host: 'ec2-54-227-240-7.compute-1.amazonaws.com',
  port: 5432,
  ssl: true
});
let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'team2ne1javiernicomedes@gmail.com',
    pass: 'team2ne1'
  }
});

// connect to database
client.connect()
  .then(function () {
    console.log('connected to database!');
  })
  .catch(function (err) {
    if (err) throw err;
    console.log('cannot connect to database!');
  });

app.engine('handlebars', exphbs({defaultLayout: 'main'})); app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// require other js to app.js
const Product = require('./models/product');
const Category = require('./models/category');
const Brand = require('./models/brand');
const Customer = require('./models/customer');
const Order = require('./models/order');
var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: './views/email/',
    defaultLayout: 'template',
    partialsDir: './views/partials/'
  },
  viewPath: './views/email/',
  extName: '.hbs'
};

app.get('/admin/', function (req, res) {
  res.render('home', {
    layout: 'admin'
  });
});

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/member/julius', function (req, res) {
  res.render('member', {
    user_image: '/julius.jpg',
    fname: 'Julius',
    fullname: 'Julius Robert Cortez Javier',
    email: 'juliusrobertjavier@gmail.com',
    cnumber: '09066931297',
    hobbies: ['Video Gaming', 'Watching Movies'],
    skills: ['Programming', 'Web Development(HTML,JS,JQuery,Ajax)', 'MySQL'],
    facebook_name: 'Julius Robert Cortez Javier',
    fb_link: 'https://web.facebook.com/JulPyo',
    i_link: 'https://www.instagram.com/julpyo/',
    t_link: 'https://twitter.com/iamtigermeow',
    y_link: 'https://www.youtube.com/user/pokatchujulius',
    git_link: 'https://github.com/meowextrem',
    insta_name: 'JulPyo - Julius Robert Javier',
    twitter_name: 'iamtigermeow',
    youtube_name: 'Julius Robert Javier',
    github_name: 'meowextrem'

  });
});

app.get('/member/charlene', function (req, res) {
  res.render('member', {
    user_image: '/charlene.jpg',
    fname: 'Charlene',
    fullname: 'Charlene Dianne Nicomedes',
    email: 'charnicomedes@gmail.com',
    cnumber: '09496651716',
    hobbies: ['Programming', 'Watching TV'],
    skills: ['Programming', 'Web Development(HTML,JS,JQuery,Ajax)', 'MySQL'],
    facebook_name: 'Charlene Dianne Nicomedes',
    fb_link: 'https://www.facebook.com/charnicomedes?',
    i_link: 'https://www.instagram.com/charnicomedes/',
    t_link: 'https://twitter.com/CharNicomedes',
    y_link: '#',
    git_link: '#',
    insta_name: 'Charlene Dianne Nicomedes',
    twitter_name: 'CharNicomedes',
    youtube_name: 'Charlene Dianne Nicomedes',
    github_name: 'Charlene Dianne Nicomedes'

  });
});

app.get('/productslist', function (req, res) {
  Product.list(client, {}, function (products) {
    res.render('product', {
      data: products
    });
  });
});

app.get('/admin/productslist', function (req, res) {
  Product.list(client, {}, function (products) {
    res.render('productadmin', {
      layout: 'admin',
      data: products
    });
  });
});

app.get('/admin/product/create', function (req, res) {
  Category.list(client, {}, function (category) {
    Brand.list(client, {}, function (brand) {
      res.render('productcreate', {
        layout: 'admin',
        categorydata: category,
        branddata: brand
      });
    });
  });
});

app.post('/product/submit', function (req, res) {
  var productData = {
    product_name: req.body.name,
    product_description: req.body.description,
    product_tagline: req.body.tagline,
    product_price: req.body.price,
    product_warranty: req.body.warranty,
    product_category: req.body.category,
    product_brand: req.body.brand,
    product_picture: req.body.picture
  };

  // console.log("ProductData", productData);

  Product.create(client, productData, function (error) {
    if (error === 1) {
      res.render('alreadyexist', {
        layout: 'admin',
        message: 'Product already exists',
        action: '/admin/product/create'
      });
    } else {
      res.redirect('/admin/productslist');
    }
  });
});

app.get('/products/:userId', function (req, res) {
  const userId = req.params.userId;
  Product.getById(client, userId, function (products) {
    var str = products[0].description;
    // console.log(products[0].description);
    var desc = str.split(',');

    res.render('productview', {

      prod_id: products[0].product_id,
      prod_picture: products[0].picture,
      prod_name: products[0].name,
      prod_desc: desc,
      prod_tagline: products[0].tagline,
      prod_price: products[0].price,
      prod_warranty: products[0].warranty,
      categoryname: products[0].category_name,
      brandname: products[0].brand_name
    });
  });
});

app.get('/admin/brand/create', function (req, res) {
  res.render('brandcreate', {
    layout: 'admin'
  });
});

app.post('/brand/submit', function (req, res) {
  // console.log(req.body.description);
  var brandData = {
    name: req.body.name,
    description: req.body.description
  };
  Brand.create(client, brandData, function (error) {
    if (error === 1) {
      res.render('alreadyexist', {
        layout: 'admin',
        message: 'Brand Already Exist',
        action: '/admin/brand/create'
      });
    } else {
      res.redirect('/admin/brands');
    }
  });
});

app.get('/admin/brands', function (req, res) {
  Brand.list(client, {}, function (brands) {
    // console.log(data1.rows);
    res.render('brands', {
      layout: 'admin',
      data: brands
    });
  });
});

app.get('/admin/brands/update/:id', function (req, res) {
  const id = req.params.id;
  Brand.getById(client, id, function (brand) {
    res.render('brandupdate', {
      layout: 'admin',
      brand_id: brand[0].brand_id,
      brand_name: brand[0].brand_name,
      brand_description: brand[0].brand_description
    });
  });
});

app.post('/admin/brandupdate/submit/:id', function (req, res) {
  var brandData = {
    brand_id: req.params.id,
    brand_name: req.body.name,
    brand_desc: req.body.description
  };
  Brand.update(client, brandData, function (success) {
    res.redirect('/admin/brands');
  });
});

app.get('/admin/categories', function (req, res) {
  client.query('SELECT * FROM products_category ORDER BY category_id ASC', (req, data1) => {
    // console.log(data1.rows);
    res.render('categories', {
      layout: 'admin',
      data: data1.rows
    });
  });
});

app.get('/admin/category/create', function (req, res) {
  res.render('categorycreate', {
    layout: 'admin'
  });
});

app.post('/admin/category/submit', function (req, res) {
  // console.log(req.body.name);
  client.query("INSERT INTO products_category (category_name) VALUES ('" + req.body.name + "') ");
  // res.render('brandcreate');
  res.redirect('/admin/categories');
});

app.get('/admin/product/update/:userId', function (req, res) {
  const userId = req.params.userId;
  Product.getById(client, userId, function (products) {
    Category.list(client, {}, function (category) {
      Brand.list(client, {}, function (brand) {
        // console.log(products);
        res.render('productupdate', {
          layout: 'admin',
          prod_id: products[0].product_id,
          prod_name: products[0].name,
          prod_desc: products[0].description,
          prod_tagline: products[0].tagline,
          prod_picture: products[0].picture,
          prod_price: products[0].price,
          prod_warranty: products[0].warranty,
          prod_cat_id: products[0].category_id,
          prod_brand_id: products[0].brand_id,
          categorydata: category,
          branddata: brand
        });
      });
    });
  });
});

app.get('/admin/product/delete/:userId', function (req, res) {
  const userId = req.params.userId;
  Product.deleteProd(client, userId, function (success) {
    res.redirect('/admin/productslist');
  });
});

app.post('/admin/product/updatesubmit/:userId', function (req, res) {
  const userId = req.params.userId;
  var productData = {
    product_id: userId,
    product_name: req.body.name,
    product_description: req.body.description,
    tagline: req.body.tagline,
    price: req.body.price,
    warranty: req.body.warranty,
    category: req.body.category,
    brand: req.body.brand,
    picture: req.body.picture
  };
  // console.log(req.body.category);
  Product.update(client, productData, function (success) {
    res.redirect('/admin/productslist');
  });
});

app.get('/admin/customers', function (req, res) {
  Customer.list(client, function (customer) {
    // console.log(data1);
    res.render('customers', {
      layout: 'admin',
      data: customer
    });
  });
});

app.get('/admin/customer/:custId', function (req, res) {
  const custId = req.params.custId;
  Customer.getById(client, custId, function (customer) {
    Order.getByCustomerId(client, custId, function (orders) {
      res.render('customerview', {
        layout: 'admin',
        first_name: customer[0].first_name,
        last_name: customer[0].last_name,
        email: customer[0].email,
        street: customer[0].street,
        municipality: customer[0].municipality,
        province: customer[0].province,
        zipcode: customer[0].zipcode,
        data2: orders
      });
    });
  });
});

app.get('/admin/orders', function (req, res) {
  Order.list(client, {}, function (orders) {
    res.render('orders', {
      layout: 'admin',
      data: orders,
      date: orders.order_date
    });
  });
});

app.post('/send-email/:userId', function (req, res) {
  const userId = req.params.userId;
  var customerData = {
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    street: req.body.street,
    municipality: req.body.municipality,
    province: req.body.province,
    zipcode: req.body.zipcode
  };
  Customer.getByEmail(client, req.body.email, function (customer) {
    console.log(customer);
    // console.log(data4.rowCount);
    if (customer !== 0) {
      console.log('data exist');
      Customer.getByEmail(client, req.body.email, function (customer) {
        var orderData = {
          customer_id: customer[0].customer_id,
          product_id: userId,
          quantity: req.body.quantity
        };
        Order.create(client, orderData, function (success) {
          console.log(success, 'Order Created');
        });
        let mailOptions = {
          from: req.body.email, // sender address
          to: 'team2ne1javiernicomedes@gmail.com', // list of receivers
          subject: 'Team 2ne1 Product Order Form', // Subject line
          template: 'email_body',
          context: {
            content: 'Here is the new customer order request! ',
            productId: userId,
            quantity: req.body.quantity,
            fname: customer[0].first_name,
            lname: customer[0].last_name,
            email: customer[0].email,
            street: customer[0].street,
            municipality: customer[0].municipality,
            province: customer[0].province,
            zipcode: customer[0].zipcode
          }
        };
        transporter.use('compile', hbs(options));
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.render('error');

            return console.log(error);
          }

          let mailOptions2 = {
            from: 'team2ne1javiernicomedes@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Team 2ne1 Product Order Form', // Subject line
            template: 'email_body',
            context: {
              content: 'Here are your order request details!! ',
              productId: userId,
              quantity: req.body.quantity,
              fname: customer[0].first_name,
              lname: customer[0].last_name,
              email: customer[0].email,
              street: customer[0].street,
              municipality: customer[0].municipality,
              province: customer[0].province,
              zipcode: customer[0].zipcode
            }
          };

          transporter.sendMail(mailOptions2, (error2, info2) => {
            if (error2) {
              res.render('error');

              return console.log(error2);
            }
            console.log('Message %s sent: %s', info2.messageId, info2.response);
            res.render('success');
          });
        });
      });
    } else if (customer === 0) {
      console.log('data not exist');
      Customer.create(client, customerData, function (success) {
        console.log(success, 'Inserted');
      });
      Customer.getByEmail(client, req.body.email, function (customer) {
        var orderData = {
          customer_id: customer[0].customer_id,
          product_id: userId,
          quantity: req.body.quantity
        };
        Order.create(client, orderData, function (success) {
          console.log(success, 'Order Created');
        });
        let mailOptions = {
          from: req.body.email, // sender address
          to: 'team2ne1javiernicomedes@gmail.com', // list of receivers
          subject: 'Team 2ne1 Product Order Form', // Subject line
          template: 'email_body',
          context: {
            content: 'Here is the new customer order request! ',
            productId: userId,
            quantity: req.body.quantity,
            fname: customer[0].first_name,
            lname: customer[0].last_name,
            email: customer[0].email,
            street: customer[0].street,
            municipality: customer[0].municipality,
            province: customer[0].province,
            zipcode: customer[0].zipcode
          }
        };
        transporter.use('compile', hbs(options));
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.render('error');

            return console.log(error);
          }

          let mailOptions2 = {
            from: 'team2ne1javiernicomedes@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Team 2ne1 Product Order Form', // Subject line
            template: 'email_body',
            context: {
              content: 'Here are your order request details!! ',
              productId: userId,
              quantity: req.body.quantity,
              fname: customer[0].first_name,
              lname: customer[0].last_name,
              email: customer[0].email,
              street: customer[0].street,
              municipality: customer[0].municipality,
              province: customer[0].province,
              zipcode: customer[0].zipcode
            }
          };

          transporter.sendMail(mailOptions2, (error2, info2) => {
            if (error2) {
              res.render('error');

              return console.log(error2);
            }
            console.log('Message %s sent: %s', info2.messageId, info2.response);
            res.render('success');
          });
        });
      });
    }
  });
});

app.listen(port, function () {
  console.log('Server started at port ' + port);
});
