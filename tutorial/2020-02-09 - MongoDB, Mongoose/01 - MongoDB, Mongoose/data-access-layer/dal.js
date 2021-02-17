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