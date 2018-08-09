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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function (req, res) {
res.render('home');
});

app.get('/member/julius', function (req, res) {
res.render('member',{
user_image: "/julius.jpg",
fname : "Julius",
fullname: "Julius Robert Cortez Javier",
email: "juliusrobertjavier@gmail.com",
cnumber: "09066931297",
hobbies: ["Video Gaming","Watching Movies"],
skills: ["Programming","Web Development(HTML,JS,JQuery,Ajax)","MySQL"],
facebook_name : "Julius Robert Cortez Javier",
fb_link: "https://web.facebook.com/JulPyo",
i_link: "https://www.instagram.com/julpyo/",
t_link: "https://twitter.com/iamtigermeow",
y_link: "https://www.youtube.com/user/pokatchujulius",
git_link: "https://github.com/meowextrem",
insta_name : "JulPyo - Julius Robert Javier",
twitter_name : "iamtigermeow",
youtube_name : "Julius Robert Javier",
github_name : "meowextrem"

});
});

app.get('/member/charlene', function (req, res) {
res.render('member',{
user_image: "/charlene.jpg",
fname : "Charlene",
fullname: "Charlene Dianne Nicomedes",
email: "charnicomedes@gmail.com",
cnumber: "09496651716",
hobbies: ["Programming","Watching TV"],
skills: ["Programming","Web Development(HTML,JS,JQuery,Ajax)","MySQL"],
facebook_name : "Charlene Dianne Nicomedes",
fb_link: "https://www.facebook.com/charnicomedes?",
i_link: "https://www.instagram.com/charnicomedes/",
t_link: "https://twitter.com/CharNicomedes",
y_link: "#",
git_link: "#",
insta_name : "Charlene Dianne Nicomedes",
twitter_name : "CharNicomedes",
youtube_name : "Charlene Dianne Nicomedes",
github_name : "Charlene Dianne Nicomedes"

});
});


app.get('/productslist', function (req, res) {

client.query("SELECT * FROM products", (req, data1)=>{
	console.log(data1);
	res.render('product',{
		data: data1.rows
	});
	
});
	
});




app.get('/products/:userId', function (req, res) {
const userId = req.params.userId;
client.query("SELECT * FROM products LEFT JOIN brands ON products.brand_id=brands.brand_id RIGHT JOIN products_category ON products.category_id=products_category.category_id where product_id="+userId+" ", (req, data3)=>{
	
		
		
		var str = data3.rows[0].description;
			var desc = str.split(",");
		
		res.render('productview',{
			
			prod_id: data3.rows[0].product_id,
			prod_picture: data3.rows[0].picture,
			prod_name: data3.rows[0].name,
			prod_desc: desc,
			prod_tagline: data3.rows[0].tagline,
			prod_price: data3.rows[0].price,
			prod_warranty: data3.rows[0].warranty,
			categoryname : data3.rows[0].category_name,
			brandname : data3.rows[0].brand_name
			});
	
		});
	
	});





app.get('/brand/create', function (req, res) {

			res.render('brandcreate');
	});
	
app.post('/brand/submit', function (req, res) {
	// console.log(req.body.description);
client.query("INSERT INTO brands (brand_name,brand_description) VALUES ('"+req.body.name+"','"+req.body.description+"') ");
	// res.render('brandcreate');
			res.redirect('/brands');
	});	
	
app.get('/brands', function (req, res) {
client.query("SELECT * FROM brands ORDER BY brand_id ASC", (req, data1)=>{
			// console.log(data1.rows);
			res.render('brands',{
				data:data1.rows
			});
			
			
		
	});	 
    
});	

app.get('/category/create', function (req, res) {

			res.render('categorycreate');
	});
	
app.post('/category/submit', function (req, res) {
	// console.log(req.body.name);
client.query("INSERT INTO products_category (category_name) VALUES ('"+req.body.name+"') ");
	// res.render('brandcreate');
			res.redirect('/categories');
	});	
	
app.get('/product/create', function (req, res) {
var temp4 = [];
var temp5 = [];
var category = [];
var brand = [];
	client.query("SELECT * FROM products_category ORDER BY category_id ASC", (req, data4)=>{
		
		for(x = 0; x < data4.rowCount; x++){

		temp4[x] = data4.rows[x];

		}	category = temp4;
		
		
		client.query("SELECT * FROM brands ORDER BY brand_id ASC", (req, data5)=>{
	
		for(x = 0; x < data5.rowCount; x++){

		temp5[x] = data5.rows[x];

		}	brand = temp5;

		res.render('productcreate',{
			categorydata : category,
			branddata : brand
			});
	
		});
	
	});
	
	
	
	

			
	});
	
app.post('/product/submit', function (req, res) {
	// console.log(req.body.category);
client.query("INSERT INTO products (name,description,tagline,price,warranty,category_id,brand_id,picture) VALUES ('"+req.body.name+"','"+req.body.description+"','"+req.body.tagline+"','"+req.body.price+"','"+req.body.warranty+"','"+req.body.category+"','"+req.body.brand+"','"+req.body.picture+"') ");
	// res.render('brandcreate');
			res.redirect('/productslist');
	});

app.get('/product/update/:userId', function (req, res) {
const userId = req.params.userId;
client.query("SELECT * FROM products LEFT JOIN brands ON products.brand_id=brands.brand_id RIGHT JOIN products_category ON products.category_id=products_category.category_id where product_id="+userId+" ", (req, data3)=>{
	
	
		
		res.render('productupdate',{
			
			prod_id: data3.rows[0].product_id,
			prod_name: data3.rows[0].name,
			prod_desc: data3.rows[0].description,
			prod_tagline: data3.rows[0].tagline,
			prod_picture: data3.rows[0].picture,
			prod_price: data3.rows[0].price,
			prod_warranty: data3.rows[0].warranty,
			prod_cat_id: data3.rows[0].category_id,
			prod_brand_id: data3.rows[0].brand_id,
			categorydata : category,
			branddata : brand
			});
	
		});
	
	});
	
app.get('/product/delete/:userId', function (req, res) {
const userId = req.params.userId;
client.query("DELETE FROM products where product_id="+userId+" ", (req, data3)=>{
	
	
		
		res.redirect('/productslist');

	
		});
	
	});	


app.post('/product/updatesubmit/:userId', function (req, res) {
	const userId = req.params.userId;
	// console.log(req.body.category);
client.query("UPDATE products SET name = '"+req.body.name+"',description = '"+req.body.description+"',tagline='"+req.body.tagline+"',price='"+req.body.price+"',warranty='"+req.body.warranty+"',category_id= '"+req.body.category+"',brand_id= '"+req.body.brand+"',picture= '"+req.body.picture+"' WHERE product_id='"+userId+"' ");
	// res.render('brandcreate');
			res.redirect('/productslist');
	});		
	
app.get('/categories', function (req, res) {
client.query("SELECT * FROM products_category ORDER BY category_id ASC", (req, data1)=>{
			// console.log(data1.rows);
			res.render('categories',{
				data:data1.rows
			});
			
			
		
	});	 
    
});	

app.get('/customers', function (req, res) {
	
     client.query("SELECT * FROM customer", (req, data1)=>{
	console.log(data1);
	res.render('customers',{
		data: data1.rows
	});
	
});
    
});	

app.get('/customer/:custId', function (req, res) {
const custId = req.params.custId;
var temp4 = [];
var temp5 = [];
var category = [];
var brand = [];
	client.query("SELECT * FROM customer WHERE customer_id="+custId+" ", (req, data4)=>{
		
		for(x = 0; x < data4.rowCount; x++){

		temp4[x] = data4.rows[x];

		}	customer = temp4;
		console.log(customer);
		
		client.query("SELECT * FROM orders INNER JOIN products on orders.product_id=products.product_id where customer_id="+custId+" ", (req, data5)=>{
	
		for(x = 0; x < data5.rowCount; x++){

		temp5[x] = data5.rows[x];

		}	orders = temp5;
		console.log(orders);

		res.render('customerview',{
			first_name : customer[0].first_name,
			last_name: customer[0].last_name,
			email: customer[0].email,
			street: customer[0].street,
			municipality: customer[0].municipality,
			province:customer[0].province,
			zipcode:customer[0].zipcode,
			data2 : orders
			});
	
		});
	
	});
	
		
	
	
	
   
	 
	 
});	

app.get('/orders', function (req, res) {
     client.query("SELECT * FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN products ON orders.product_id=products.product_id ORDER BY orders_id ASC", (req, data1)=>{
	console.log(data1.rows);
	res.render('orders',{
		data: data1.rows
	});
   });
});	
	
	


app.post('/send-email/:userId', function (req, res) {
	 const userId = req.params.userId;
	 
	 client.query("SELECT * FROM customer where email='"+req.body.email+"' ", (req2, data4)=>{
		// console.log(data4);	
		console.log(data4.rowCount);
		if(data4.rowCount >= 1){
			
			client.query("SELECT * FROM customer where email='"+req.body.email+"' ",(req3, data11)=>{
				client.query("INSERT INTO orders (customer_id,product_id,quantity,order_date) VALUES ('"+data11.rows[0].customer_id+"','"+userId+"','"+req.body.quantity+"',CURRENT_TIMESTAMP)"); 
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
				subject: 'Team 2ne1 Product Order Form', // Subject line
				text: '<p>Here is the new customer order request! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>', // plain text body
				html: '<p>Here is the new customer order request! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>'// html body
				};

				transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  res.render('error');

				return console.log(error);
				}
				
				let mailOptions2 = {
				from: 'team2ne1javiernicomedes@gmail.com', // sender address
				to: req.body.email, // list of receivers
				subject: 'Team 2ne1 Product Order Form', // Subject line
				text: '<p>Here are your order request details!! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>', // plain text body
				html: '<p>Here are your order request details!! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>'// html body
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
		 else if(data4.rowCount == 0){
			 console.log('no data exist!')
			 client.query("INSERT INTO customer (email,first_name,last_name,street,municipality,province,zipcode) VALUES ('"+req.body.email+"','"+req.body.fname+"','"+req.body.lname+"','"+req.body.street+"','"+req.body.municipality+"','"+req.body.province+"','"+req.body.zipcode+"')");
			 client.query("SELECT * FROM customer where email='"+req.body.email+"' ",(req4, data11)=>{
				 console.log(data11.rows[0].customer_id + " " +userId+ " "+req.body.quantity);
				client.query("INSERT INTO orders (customer_id,product_id,quantity,order_date) VALUES ('"+data11.rows[0].customer_id+"','"+userId+"','"+req.body.quantity+"',CURRENT_TIMESTAMP)"); 
				 
			
			client.query("SELECT * FROM customer where email='"+req.body.email+"' ",(req3, data11)=>{
				client.query("INSERT INTO orders (customer_id,product_id,quantity,order_date) VALUES ('"+data11.rows[0].customer_id+"','"+userId+"','"+req.body.quantity+"',CURRENT_TIMESTAMP)"); 
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
				subject: 'Team 2ne1 Product Order Form', // Subject line
				text: '<p>Here is the new customer order request! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>', // plain text body
				html: '<p>Here is the new customer order request! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>'// html body
				};

				transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  res.render('error');

				return console.log(error);
				}
				
				let mailOptions2 = {
				from: 'team2ne1javiernicomedes@gmail.com', // sender address
				to: req.body.email, // list of receivers
				subject: 'Team 2ne1 Product Order Form', // Subject line
				text: '<p>Here are your order request details!! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>', // plain text body
				html: '<p>Here are your order request details!! <br> <b>Product Id</b>: '+ userId+'<br> <b>Product Quantity:</b> '+ req.body.quantity+'<br> <b>Customer Name</b>: '+ req.body.fname+' ' +req.body.lname+' <br> <b>Email</b>: '+ req.body.email +'<br> <b>Street</b>: '+ req.body.street+' <br> <b>Municipality</b>: '+ req.body.municipality +' <br> <b>Province</b>: '+ req.body.province +' <br> <b>Zipcode</b>: '+ req.body.zipcode+ '</p>'// html body
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
				 
				 
				 res.render('success');
			 });
		 }
		 
	 });
	 
	 
	 
	 
     
      });


app.listen(port, function() {
console.log('Server started at port ' + port);
});