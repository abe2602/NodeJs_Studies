const express = require("express");
const user = express.Router();
const Users = require("../model/user");

user.get("/", (req, res) => {
    //Retorna todos os usuários
    Users.find({}, (err, data) =>{
        if(err){
            return res.send({error: "DEU PAU"});
        }else{
            return res.send(data);
        }
    });
})

user.post("/create", (req, res) => {
    //const obj = req.body;
    console.log(req.body)
    const {email, password} = req.body; //Desestruturamento! 

    if(!password || !email){
        console.log(email, password);
        return res.send({erro: "Preencha corretamente!"});
    }
    Users.findOne({email}, (err, data) => {
        if(err){
            return res.send({error: "Deu o erro " + err});
        }else if(data){
            return res.send({erro: "usuario jah existe!"});
        }else{
            Users.create(req.body, (err, data) =>{
                if(err){
                    return res.send({error: "Deu o erro " + err});
                }else{
                    data.password = undefined;
                    return res.send(data);
                }
            })
        }
    })
    
})

module.exports = user;