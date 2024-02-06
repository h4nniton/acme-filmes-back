/*******************************************************************************************
 * Objetivo: Criar funções
 * Data: 
 * Autor: Emily - peguei do professor Marcel
 * Versão: 1.0
***********************************************************************************************/


/*
    Para realizar a integração com Banco de Dados precisamos de uma biblioteca

        - SEQUELIZE ORM (biblioteca mais antiga)
        - PRISMA ORM    (bibliioteca mais atual)
        - FASTFY ORM    (bibliioteca mais atual)

        Instalação do PRISMA ORM
            npm install prisma --save (É quem realiza a conexão com o BD)
            npm install @prisma/client --save (É quem executa os scrpts SQL no BD)


*/

//Import das bibliotecas do projeto 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Cria um objeto app tendo como referencia a classe do express
const app = express();


app.use((request, response, next)=>{

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET');
    app.use(cors());
    next();
});

/********************* Import dos arquivos internos do projeto *****************************************/

 const controllerFilmes = require('./controller/controller_filme.js'); 


 /******************************************************************************************************/

//EndPoints: Retorna os dados do arquivo
app.get('/v1/acmefilmes/filmes', cors(), async function(request, response, next){

    let controllerFilmes = require('./controller/funcoes.js');

    let filmes = controllerFilmes.getFilmes();
    if (filmes){
        response.json(filmes);
        response.status(200);
    }else{
        response.status(404);
    }


});

// EndPoints: Retorna os dados do Banco de Dados
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response, next){

    // Chama a função para retornar os dados de Filme
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    // Validação para retornar os dados ou o erro quando não houver dados
    if (dadosFilmes) {
        response.json(dadosFilmes);
        response.status(200);
    } else {
        response.json({message: 'nenhum registro encontrado'})
        response.status(404);
    }
})

//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, function(){
    console.log('API funcionando e aguardadndo requisições');
});