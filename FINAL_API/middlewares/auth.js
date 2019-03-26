/** 
 * Middleware de autentificação por token. Ou seja, o que isso aqui faz é: 
 * Utilizando o jasonwebtoken, eu posso definir quais usuários tem acesso a
 * quais informações, utilizando tokens. (está sendo usado no index.js)
*/

const jwt = require("jsonwebtoken");
const config = require("./config/config");

//Middleware criado
const auth = (req, res, next) => {
    const header = req.headers.auth;

    if(!header){
        return res.status(401).send({erro: "Autentificação recusada"});
    }

    jwt.verify(header, config.jwt_pass, (err, decoded) => {
        if(err){
            return res.status(401).send({erro: "Token invalido"});
        }else{
            res.locals.authData = decoded; //Coloca a informação do ID em variáveis locais
            return next();
        }
    });
}

module.exports = auth;