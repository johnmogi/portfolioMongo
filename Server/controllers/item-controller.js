const express = require("express");
const itemsLogic = require("../business-logic-layer/items-logic");
// const Item = require("../models/item");
const router = express.Router();

// GET http://localhost:3000/api/items
router.get("/", async (request, response) => {
    try {
        const items = await itemsLogic.getAllItemsAsync();
        response.json(items);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err.message);
    }
});

// // GET http://localhost:3000/api/items/7
// router.get("/:_id", async (request, response) => {
//     try {
//         const _id = request.params._id;
//         const item = await itemsLogic.getOneItemAsync(_id);

//         if (!item) {
//             response.sendStatus(404);
//             return;
//         }

//         response.json(item);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // POST http://localhost:3000/api/items
// router.post("/", async (request, response) => {
//     try {
//         const item = new Item(request.body);
//         const addedItem = await itemsLogic.addItemAsync(item);
//         response.status(201).json(addedItem);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // PUT http://localhost:3000/api/items/7
// router.put("/:_id", async (request, response) => {
//     try {
//         const _id = request.params._id;
//         const item = new Item(request.body);
//         item._id = _id;
//         const updatedItem = await itemsLogic.updateItemAsync(item);

//         if (updatedItem === null) {
//             response.sendStatus(404);
//             return;
//         }

//         response.json(updatedItem);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // PATCH http://localhost:3000/api/items/7
// router.patch("/:_id", async (request, response) => {
//     try {
//         const _id = request.params._id;
//         const item = new Item(request.body);
//         item._id = _id;
//         const updatedItem = await itemsLogic.updateItemAsync(item);

//         if (updatedItem === null) {
//             response.sendStatus(404);
//             return;
//         }

//         response.json(updatedItem);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // DELETE http://localhost:3000/api/items/7
// router.delete("/:_id", async (request, response) => {
//     try {
//         const _id = request.params._id;
//         await itemsLogic.deleteItemAsync(_id);
//         response.sendStatus(204);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// // --------------------------------------------------
// // Queries: 
// router.get("/by-price-range/:minPrice/:maxPrice",async (request, response) => {
//     try {
//         const minPrice = +request.params.minPrice;
//         const maxPrice = +request.params.maxPrice;
//         const items = await itemsLogic.getItemsByPriceRangeAsync(minPrice, maxPrice);
//         response.json(items);
//     }
//     catch(err) {
//         response.status(500).send(err.message);
//     }
// });

module.exports = router;