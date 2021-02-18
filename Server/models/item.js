const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    name: String,
    description: String,
    date: String,
    category: String,
    customer: String,
    date: String,
    thumb: String,
    image: String
}, { versionKey: false }); 

const Item = mongoose.model("Item", ItemSchema, "items");

module.exports = Item;
