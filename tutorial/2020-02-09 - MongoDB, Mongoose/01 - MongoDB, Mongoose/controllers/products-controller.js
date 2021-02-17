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
