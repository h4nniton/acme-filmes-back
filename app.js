/*******************************************************************************************
 * Objetivo: Arquivo para realizar as requisições de filmes
 * Data: 30/01/2024
 * Autor: Nycolle L.
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

            Após as instalações devemos rodar o comando:
            npx prisma init (Esse comando inicializa a utilização do Prisma no projeto)

*/

//Import das bibliotecas do projeto 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Cria um objeto app tendo como referencia a classe do express
const app = express();

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

// Cria um objeto para definir o tipode dados que irá chegar do BODY (JSON) 
const bodyParserJSON = bodyParser.json();

/*************** IMPORT DOS ARQUIVOS INTERNOS DO PROJETO ******************/

const controllerFilmes = require('./controller/controller_filme.js');

// *************************************************************************

//EndPoints:  Retorna os dados do arvquivo JSON
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

//EndPoints:  Retorna os dados do Banco de Dados
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response, next){

    // Chama a função para retornar os dados de filme
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    // Validação para retornar os dados ou o erro quando não houver dados
if (dadosFilmes) {
    response.json(dadosFilmes);
    response.status(200);
} else {
        response.json({mesage: 'Nenhum registro encontrado'});
        response.status(404);
    }
});

// EndPoint : Retorna o filme filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response,next){

    // Recebe o ID encaminhado na requisição
    let idFilme = request.params.id;

    // Solicita o filme para controller filtrando pelo ID
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    // Retorna status_Code e JSON com dados ou mensagem de erro
    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
});


// EndPoint : Retorna os filmes por filtro
app.get('/v2/acmefilmes/filtro/filme', cors(), async function(request, response, next){

    // let sql = `select * from tbl_filmes where id = ${id}`;

    let filtroFilme = filtroFilme.getFiltrarFilme;

    response.status(filtroFilme.status_code)
    response.json(filtroFilme)

    // let filtroFilmes = await prisma.$queryRawUnsafe(sql);

    // return filtroFilmes;
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type'];

    console.log(contentType);
    
    // Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body;

    // Encaminha os dados para controller inserir no BD
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);

    response.status(resultDados.status_code);
    response.json(resultDados);
});

//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições');
});