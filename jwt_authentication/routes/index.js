const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

//Utiliza o middleware
router.get("/", auth, (req, res) => {
    console.log(res.locals.authData)
    return res.send({messa: "INFORMAÇÃO IMPORTANTE "});
})

router.post("/", (req, res) => {
    return res.send({messa: "index POST OK"});
})

module.exports = router