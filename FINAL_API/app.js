const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //Parse de body de um POST
const config = require("./config/config");

const app = express();

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true};

const indexRoutes = require("./routes/index.js");
const userRoutes = require("./routes/users.js");

//MONGOOSE
mongoose.connect(url, options);
mongoose.set("useCreateIndex", true); //só para não mostrar coisas no console

//Trata algum erro
mongoose.connection.on("error", (err) =>{
    console.log("Deu pau" + err);
})

//Trata algum erro
mongoose.connection.on("connected", () =>{
    console.log("Deu bom");
})
//Trata erro de desconexão
mongoose.connection.on("disconnected", (err) =>{
    console.log("Deu pau" + err);
})

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//GERAL
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.listen(3000);

module.exports = app;