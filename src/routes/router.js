// npm packages ...
const express = require('express');
const path = require('path');
const router = express();
const nodemailer = require("nodemailer");

router.set('views', path.join(__dirname, '../../templates/views'));
const Product = require('../models/product');

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD
	},
});


// index route ...
router.get('/', async (req, res) => {


	const doc = await Product.find();

	res.status(200).render('index',  {doc: doc});

});

// product route ...
router.get('/products', async (req, res) => {


	const doc = await Product.find();

	res.render('product', {doc: doc})

})

// product route ...
router.get('/contact', (req, res) => {
	res.render('contact');
});

// create product post request
// router.post("/api/v1/product", (req, res) => {


// 	const registerProduct = new Product({
// 		name: req.body.name,
// 		price: req.body.price,
// 		firstImg: req.body.firstImg,
// 		secondImg: req.body.secondImg,
// 		thirdImg: req.body.thirdImg
// 	});

// 	const registered = registerProduct.save();

// 	red.render('reg')

// })

// nodemailer post request
router.post("/api/v1/mail", (req, res) => {


	let mailOptions = {
		from: "productionbabablock@gmail.com",
		to: "productionbabablock@gmail.com",
		subject: req.body.name,
		text: `${req.body.name} => ${req.body.email} ${req.body.number} || ${req.body.message}`,
	};

	transporter.sendMail(mailOptions, function (err, data) {
		if (err) {
			res.render('index', { message: "Something Went Wrong" });
		} else {
			res.render('index', { message: "Email sent successfully" });
		}
	});

});


// router.get('/reg', (req, res) => {
// 	res.render('reg')
// })

// 404 error route ...
router.get('*', (req, res) => {
	res.render('error');
});



module.exports = router;