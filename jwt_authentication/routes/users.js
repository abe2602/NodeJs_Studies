const express = require("express");
const Users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = express.Router();

//Funções auxiliares
const creatUserToken = (userId) =>{
    return jwt.sign({id:userId}, "12345", {expiresIn: "7d"});
}


//Funções API Rest
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

            return res.send({usuario: user, token: creatUserToken(user.id)});
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
                return res.send({usuario: user, token: creatUserToken(user.id)});
            }else{
                return res.send({erro: "Senha incorreta!"});
            }
        }
    } catch (err) { //Alguma exceção aconteceu
        return res.send({erro: "Erro ao buscar!" + err});
    }
});

module.exports = user;