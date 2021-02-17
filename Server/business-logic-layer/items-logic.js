const dal = require("../data-access-layer/dal");
// const Item = require("../models/item");

dal.connectAsync()
    .then(db => console.log("We're connected to " + db.name + " on MongoDB."))
    .catch(err => console.log(err));

// function addItemAsync(item) {
//     return item.save();
// }

function getAllItemsAsync() {
    return new Promise((resolve, reject) => {
        Item.find({}, (err, items) => { // {} = החזר את כל המוצרים
            if (err) {
                reject(err);
                return;
            }
            resolve(items);
        });
    });
}

// function getOneItemAsync(_id) {
//     return new Promise((resolve, reject) => {
//         Item.findOne({ _id }, (err, item) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(item);
//         });
//     });
// }

// function updateItemAsync(item) {
//     return new Promise((resolve, reject) => {
//         Item.updateOne({ _id: item._id }, item, (err, info) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(info.n ? item : null); // info.n - מספר המוצרים שנמצאו
//         });
//     });
// }

// function deleteItemAsync(_id) {
//     return new Promise((resolve, reject) => {
//         Item.deleteOne({ _id }, (err, info) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve();
//         });
//     });
// }

// // Comparison Query Operators: 
// // $gt  - Greater Than...
// // $gte - Greater Than or Equal
// // $lt  - Less Than
// // $lte - Less Than or Equal
// // $eq  - Equal
// // $ne  - Not Equal
// // $in  - In
// // $nin - Not In

// function getItemsByPriceRangeAsync(minPrice, maxPrice) {
//     return new Promise((resolve, reject) => {
//         Item.find({ price: { $gte: minPrice, $lte: maxPrice } }, (err, items)=>{
//             if(err) {
//                 reject(err);
//                 return;
//             }
//             resolve(items);
//         });
//     });
// }

module.exports = {
    // addItemAsync,
   getAllItemsAsync,
    // getOneItemAsync,
    // updateItemAsync,
    // deleteItemAsync,
    // getItemsByPriceRangeAsync
};