var express = require('express');
var exphbs = require('express-handlebars'); // "express-handlebars" 
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var id = null;
var { Client } = require('pg');
var port = process.env.PORT || 3000
var client = new Client({
	
	database: 'dd1ictctqi0cm3',
	user: 'oxhzdvnaspxdtt',
	password: 'd90fcd2cdd91a8ba06b2ac72f68f0cca6e9eb38bde8d4eb08e6d92b504514cb9',
	host: 'ec2-54-227-240-7.compute-1.amazonaws.com',
	port: 5432,
	ssl: true
});

// connect to database
client.connect()
	.then(function() {
		console.log('connected to database!')
	})
	.catch(function(err) {
		console.log('cannot connect to database!')
	});



app.engine('handlebars', exphbs({defaultLayout: 'main'})); app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
res.render('home');
});


app.get('/productslist', function (req, res) {
var temp2 = [];
var temp3 = [];
var temp4 = [];
var temp5 = [];
var desktop = [];
var phone = [];
var tablet = [];
var laptop = [];
var x;
client.query("SELECT * FROM products where product_type='desktop'", (req, data1)=>{
	
	for(x = 0; x < data1.rowCount; x++){
	
		temp2[x] = data1.rows[x];
		
	}	desktop = temp2;
	
	client.query("SELECT * FROM products where product_type='phone'", (req, data3)=>{
	
	for(x = 0; x < data3.rowCount; x++){

	temp3[x] = data3.rows[x];

	}	phone = temp3;
	
	
		client.query("SELECT * FROM products where product_type='tablet'", (req, data4)=>{
		
		for(x = 0; x < data4.rowCount; x++){

		temp4[x] = data4.rows[x];

		}	tablet = temp4;
		
		
		client.query("SELECT * FROM products where product_type='laptop'", (req, data5)=>{
	
		for(x = 0; x < data5.rowCount; x++){

		temp5[x] = data5.rows[x];

		}	laptop = temp5;
		// console.log(desktop);
		// console.log(phone);
		// console.log(tablet);
		// console.log(laptop);
		res.render('product',{
			products1 : desktop,
			products2 : phone,
			products3 : tablet,
			products4 : laptop
			});
	
		});
	
	});

	});
	
	
});
	
	
	
	});


app.get('/products/:userId', function (req, res) {
const userId = req.params.userId;
client.query("SELECT * FROM products where product_id="+userId+" ", (req, data2)=>{
			var str = data2.rows[0].product_desc;
			var desc = str.split(",");
			console.log(desc);
			res.render('productview',{
			prod_image: data2.rows[0].picture,
			prod_id: data2.rows[0].product_id,
			prod_name: data2.rows[0].product_name,
			prod_type: data2.rows[0].product_type,
			prod_desc: desc,
			prod_brand: data2.rows[0].brand,
			prod_price: data2.rows[0].price,
			});
	});
});

app.post('/send-email/:userId', function (req, res) {
	 const userId = req.params.userId;
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'team2ne1javiernicomedes@gmail.com',
              pass: 'team2ne1'
          }
      });
      let mailOptions = {
          from: req.body.email, // sender address
          to: 'team2ne1javiernicomedes@gmail.com', // list of receivers
          subject: 'E-Commerce Contact Email', // Subject line
          text: 'Product Id: '+ req.body.id+'<br> Customer Name: '+ req.body.cust_name+'/n Phone: '+ req.body.phone +'/n Email: '+ req.body.email +'/n Customer Quantity: '+ req.body.quantity, // plain text body
          html: '<p><b>Product Id:</b> '+ userId+'<br> <b>Customer Name:</b> '+ req.body.cust_name+'<br> <b>Phone:</b> '+ req.body.phone +'<br> <b>Email:</b> '+ req.body.email +'<br> <b>Product Quantity:</b> '+ req.body.quantity + '</p>'// html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
			  		  res.render('error');
	
              return console.log(error);
		  }
          console.log('Message %s sent: %s', info.messageId, info.response);
			  res.render('success');
		  });
      });


app.listen(port, function() {
console.log('Server started at port ' + port);
});