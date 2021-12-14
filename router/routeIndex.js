const express = require("express");
const Route = express.Router();
const rout = require("./route");
const decurateHtml = require("../middleware/decurateHtml");

Route.get("/", decurateHtml("index"), rout.index);


Route.post("/",decurateHtml("index"), rout.new_po);


Route.post("/row_id", rout.row_id);
Route.post("/out_id", rout.out_id);
Route.post("/row_I", rout.row_I);

Route.post("/search", rout.search);
Route.post("/po", rout.po);
Route.post("/del", rout.del);
Route.post("/row_delete", rout.row_delete);



Route.post("/card", rout.card);





module.exports = Route;
