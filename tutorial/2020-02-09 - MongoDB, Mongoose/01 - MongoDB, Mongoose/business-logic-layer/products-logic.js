const dal = require("../data-access-layer/dal");
const Product = require("../models/product");

dal.connectAsync()
    .then(db => console.log("We're connected to " + db.name + " on MongoDB."))
    .catch(err => console.log(err));

function addProductAsync(product) {
    return product.save();
}

function getAllProductsAsync() {
    return new Promise((resolve, reject) => {
        Product.find({}, (err, products) => { // {} = החזר את כל המוצרים
            if (err) {
                reject(err);
                return;
            }
            resolve(products);
        });
    });
}

function getOneProductAsync(_id) {
    return new Promise((resolve, reject) => {
        Product.findOne({ _id }, (err, product) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(product);
        });
    });
}

function updateProductAsync(product) {
    return new Promise((resolve, reject) => {
        Product.updateOne({ _id: product._id }, product, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info.n ? product : null); // info.n - מספר המוצרים שנמצאו
        });
    });
}

function deleteProductAsync(_id) {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// Comparison Query Operators: 
// $gt  - Greater Than...
// $gte - Greater Than or Equal
// $lt  - Less Than
// $lte - Less Than or Equal
// $eq  - Equal
// $ne  - Not Equal
// $in  - In
// $nin - Not In

function getProductsByPriceRangeAsync(minPrice, maxPrice) {
    return new Promise((resolve, reject) => {
        Product.find({ price: { $gte: minPrice, $lte: maxPrice } }, (err, products)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(products);
        });
    });
}

module.exports = {
    addProductAsync,
    getAllProductsAsync,
    getOneProductAsync,
    updateProductAsync,
    deleteProductAsync,
    getProductsByPriceRangeAsync
};