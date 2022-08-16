

// npm packages ...
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const path = require('path');
const hbs = require('hbs');
const Routes = require('./routes/router'); // app routes ...
const app = express();
const port = process.env.PORT || 5000;

// file paths ...
const staticPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views/');
const partialsPath = path.join(__dirname, '../templates/partials/');

// app middlewares ...
app.set('view engine', 'hbs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));
app.use(Routes);

// mongodb connection ...
mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('database connected');
    }).catch((error) => {
        console.log(`error occured while database connection => ${error}`);
    });

// listening to app on port 5000 ...
app.listen(port, (error) => {
    if (error) {
        console.log(`error occured while listening to app => ${error}`);
    } else {
        console.log(`server running on localhost port ${port}`);
    }
});