const express = require("express");
const app = express();

app.get("/", (req, res) =>{
    return res.send({message: "Hello world"});
});

app.post("/", (req, res) => {
    return res.send({message: "post hello world"});
})

app.listen(3000)
module.exports = app;