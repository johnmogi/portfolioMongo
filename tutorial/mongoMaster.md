0. make sure mongo runs locally (use plan.md)

0. mkdir Server | cd Server | npm i mongoose cors joi express | npm init -y 

0. app.js :
const express = require("express");
const cors = require("cors");
const productsController = require("./controllers/products-controller");
const server = express();
server.use(cors());
server.use(express.json());
server.use("/api/products", productsController);
server.listen(3000, () => console.log("Listening on http://localhost:3000"));

0. mkdir controllers / product-controller : 
const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const Product = require("../models/product");
const router = express.Router();
// GET http://localhost:3000/api/products
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err.message);
    }
});
// GET http://localhost:3000/api/products/7
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProductAsync(_id);
        if (!product) {
            response.sendStatus(404);
            return;
        }

        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// POST http://localhost:3000/api/products
router.post("/", async (request, response) => {
    try {
        const product = new Product(request.body);
        const addedProduct = await productsLogic.addProductAsync(product);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// PUT http://localhost:3000/api/products/7
router.put("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const product = new Product(request.body);
        product._id = _id;
        const updatedProduct = await productsLogic.updateProductAsync(product);

        if (updatedProduct === null) {
            response.sendStatus(404);
            return;
        }

        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// PATCH http://localhost:3000/api/products/7
router.patch("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const product = new Product(request.body);
        product._id = _id;
        const updatedProduct = await productsLogic.updateProductAsync(product);
        if (updatedProduct === null) {
            response.sendStatus(404);
            return;
        }

        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// DELETE http://localhost:3000/api/products/7
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await productsLogic.deleteProductAsync(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// --------------------------------------------------
// Queries: 
router.get("/by-price-range/:minPrice/:maxPrice",async (request, response) => {
    try {
        const minPrice = +request.params.minPrice;
        const maxPrice = +request.params.maxPrice;
        const products = await productsLogic.getProductsByPriceRangeAsync(minPrice, maxPrice);
        response.json(products);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});
module.exports = router;

0.  business-logic-layer/items-logic :
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

0. data-access-layer/dal :
const mongoose = require("mongoose");
// MongoDB-התחברות אסינכרונית ל
function connectAsync() {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb://localhost:27017/Northwind",
            { useNewUrlParser: true, useUnifiedTopology: true }, (err, mongo) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(mongo);
            });
    });
}
module.exports = {
    connectAsync
};

0. 
