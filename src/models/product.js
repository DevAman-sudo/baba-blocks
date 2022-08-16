require('dotenv').config();
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type: String
    },


});



const Product = new mongoose.model("Product", productSchema);

module.exports = Product;