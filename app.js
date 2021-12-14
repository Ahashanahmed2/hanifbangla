//import external
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");


const path = require("path");
const { urlencoded, json } = require("body-parser");
const moment = require("moment-timezone");

//import Internal
const { notfound, errorHandler } = require("./router/errorsHandler");
const route = require("./router/routeIndex");
const http = require('http')

//configaration

const app = express();
dotenv.config();
// http.createServer(app)

//app setup
app.use(urlencoded({ extended: true }));
app.use(json());
app.set("view engine", "ejs");
app.locals.moment = moment;

app.use(express.static(path.join(__dirname, "public")));

//database connected
mongoose.connect(process.env.DB, () => {
  console.log("database connected");
});

//route
app.use("/", route);

//NotFound route
app.use(notfound);
//ErrorHandaler
app.use(errorHandler);

//server connndeted
app.listen(process.env.PORT, () => {
  console.log(`server is conndeted http://localhost:${process.env.PORT}`);
});
