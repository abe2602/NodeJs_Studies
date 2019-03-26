const express = require("express");
const user = express.Router();
const Users = require("../model/user");
const bcrypt = require("bcrypt");

user.get("/", async(req, res) => {
    try{
        const users = await Users.find({});
        return res.send(users);
    }catch(err){
        return res.send("Deu pau");
    }
});

user.post("/create", async(req, res) => {
    const {email, password} = req.body; //Desestruturamento! 

    //Verifica se tudo foi preenchido corretamente
    if(!password || !email){
        console.log(email, password);
        return res.send({erro: "Preencha corretamente!"});
    }

    try{
        //Verifica se o usuario ja existe
        if(await Users.findOne({email})){
            return res.send({erro: "usuario jah existe!"});
        }else{
            //Cria um novo usuario
            const user = await Users.create(req.body);
            user.password = undefined;
            return res.send(user);
        }
    }catch(err){
        return res.send({error: "Deu o erro "});
    }
});

user.post("/auth", async(req, res) =>{
    const{email, password} = req.body;

    //Verifica se tudo foi preenchido corretamente
    if(!password || !email){
        return res.send({erro: "Preencha corretamente!"});
    }

    try {
        const user = await Users.findOne({ email }).select("+password"); //Seleciona a senha junto
        
        //Verifica se o Usuario esta registrado
        if(!user){
            return res.send({erro: "Usuario nao registrado!"});
        }else{
            //Recupera a senha do usuario
            const pass = await bcrypt.compare(password, user.password);

            //Verifica a Senha do usuario
            if(pass){
                user.password = undefined;
                return res.send(user);
            }else{
                return res.send({erro: "Senha incorreta!"});
            }
        }
    } catch (err) { //Alguma exceção aconteceu
        return res.send({erro: "Erro ao buscar!" + err});
    }
});

module.exports = user;