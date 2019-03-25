const express = require("express");
const user = express.Router();

user.get("/", (req, res) => {
    return res.send({message: "user GET OK"});
})

user.post("/", (req, res) => {
    return res.send({message: "user POST OK"});
})

user.post("/create", (req, res) => {
    let user = {name: "Brunito", age: 22};
    return res.send(user)
})

module.exports = user