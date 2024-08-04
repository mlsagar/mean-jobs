require("dotenv").config();
require("./api/data/database-connection");

const { urlencoded } = require("body-parser");
const express = require("express");

const routes = require("./api/routes");

const port = process.env.PORt;

const application = express();

application.use(express.json());
application.use(urlencoded({extended: true}));
application.use("/api", (request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    next();
})
application.use("/api", routes)

application.listen(port, console.log("Application listening in", port));