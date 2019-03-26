const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.send({messa: "index GET OK"});
})

router.post("/", (req, res) => {
    return res.send({messa: "index POST OK"});
})

module.exports = router