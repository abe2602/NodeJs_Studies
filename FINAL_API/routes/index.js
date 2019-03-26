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


/*
CÓDIGOS IMPORTANTES HTTP
200 - Tudo certo
201 - Criado -  (usado quando alguma coisa é criada com sucesso)
202 - Aceito - (Requisição aceita, mas não processada)

400 - Deu ruim :(
401 - Não Autenticado - (Quando uma autentificação falha, é temporário)
403 - Proibido/Não autorizado - (Quando você não está autorizado, não é temporário)
404 - Não encontrado - (quando não tem o endpoint)

500 - Deu MUITO ruim, API morreu
501 - Não implementado - (Funcionalidade não implementada)
503 - Serviço indisponível 
*/