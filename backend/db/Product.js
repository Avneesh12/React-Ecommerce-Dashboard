const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    catagory:String,
    userId:String,
    company:String
});

const Product = mongoose.model("products",productSchema);

module.exports = Product;