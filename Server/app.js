const express = require("express");
const cors = require("cors");
const itemsController = require("./controllers/item-controller");
const server = express();
server.use(cors());
server.use(express.json());
server.use("/api/items", itemsController);
server.listen(3000, () => console.log("Listening on http://localhost:3000"));