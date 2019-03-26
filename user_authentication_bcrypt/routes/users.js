const express = require("express");
const user = express.Router();
const Users = require("../model/user");
const bcrypt = require("bcrypt");

user.get("/", (req, res) => {
    //Retorna todos os usuários
    Users.find({}, (err, data) =>{
        if(err){
            return res.send({error: "DEU PAU"});
        }else{
            return res.send(data);
        }
    });
});

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
            });
        }
    });
});

//Recebe usuario e senha para tentar dar um login (req são dados vindo do usuário)
user.post("/auth", (req, res) =>{
    const{email, password} = req.body;

    if(!password || !email){
        console.log(email, password);
        return res.send({erro: "Preencha corretamente!"});
    }else{
        Users.findOne({email}, (err, data) =>{
            if(err){
                return res.send("Erro ao encontrar o user");
            }else if(!data){
                return res.send("Usuario nao existe!");
            }else{
                bcrypt.compare(password, data.password, (err, same) => {
                    if(!same){
                        return res.send("Senha incorreta");
                    }else{
                        data.password = undefined;
                        return res.send(data);
                    }
                });
            }
        }).select("+password"); //Obriga a enviar a senha
    }
});

module.exports = user;