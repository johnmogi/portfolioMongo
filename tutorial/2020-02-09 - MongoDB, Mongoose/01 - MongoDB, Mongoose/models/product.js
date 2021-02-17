const mongoose = require("mongoose");

// Create Schema of a Product - מה יש במוצר אחד
const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
}, { versionKey: false }); // versionKey: false - לא להוסיף פרמטר נוסף עבור גרסה

// Create a Product Model: 
const Product = mongoose.model("Product", ProductSchema, "products"); // Model Name, Schema, Collection

module.exports = Product;
