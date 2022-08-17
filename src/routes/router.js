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

	try {

		const doc = await Product.find().limit(3);

		res.status(200).render('index', { doc: doc });

	} catch (err) {
		res.redirect('/')
	}

});

// services route ...
router.get('/services', (req, res) => {
	res.render('services');
});

// projects route ...
router.get('/projects', (req, res) => {
	res.render('projects');
});

// product route ...
router.get('/products', async (req, res) => {


	const doc = await Product.find();

	res.render('product', { doc: doc })

})

// search route ...
// router.post('/search', async (req, res) => {


// 	const doc = await Product.findOne({price: req.body.search});
// 	console.log(doc)
// 	res.render('product', {doc: doc})

// })

// contact route ...
router.get('/contact', (req, res) => {
	res.render('contact');
});

// details route ...
router.get('/details', async (req, res) => {
	try {

		const productDetails = await Product.findById(req.query.id)

		const doc = await Product.find().limit(3);


		res.status(200).render('details', {
			name: productDetails.name,
			price: productDetails.price,
			image: productDetails.image,
			size: productDetails.size,
			desc: productDetails.desc,
			doc: doc
		})

	} catch (err) {
		res.status(404).redirect('/404')
	}


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
router.post("/", (req, res) => {

	try {

		let mailOptions = {
			from: "productionbabablock@gmail.com",
			to: "productionbabablock@gmail.com",
			subject: req.body.name,
			text: `${req.body.name} => ${req.body.email}
		 ${req.body.number} 
		 ${req.body.message}`,
		};

		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				res.redirect('/');
			} else {
				res.render('index', { msg: "we have received your message" });
			}
		});

	} catch (err) {
		res.redirect('/')
	}

});

// order post request
router.post("/order", (req, res) => {

	try {


		let mailOptions = {
			from: "productionbabablock@gmail.com",
			to: "productionbabablock@gmail.com",
			subject: req.body.name,
			text: `
		${req.body.username} => ${req.body.email}
		 ${req.body.number} 
		 Product = ${req.body.name}
		 QTY = ${req.body.quantity}
		 Message =  ${req.body.message}`,
		};

		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				res.redirect('/products');
			} else {
				res.render('product', { msg: "we will call you soon." });
			}
		});

	} catch (err) {
		res.redirect('/products')
	}

});

// subscribe post request
router.post('/subscribe', (req, res) => {

	try {

		let mailOptions = {
			from: "productionbabablock@gmail.com",
			to: "productionbabablock@gmail.com",
			subject: 'Subscribed',
			text: `${req.body.email} subscribed to Baba Blocks Productions`,
		};

		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				res.redirect('/');
			} else {
				res.render('index', { msg: "You're Subscribed" });
			}
		});

	} catch (err) {
		res.redirect('/')
	}

})

// 404 error route ...
router.get('*', (req, res) => {
	res.render('error');
});



module.exports = router;