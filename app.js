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

/******************************** FILMES ***********************************/

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

// *************************************************************************

/********************************  GENEROS *********************************/

//Endpoint :  lista de generos do banco de dados
app.get('/v2/AcmeFilmes/generos', cors(), async function (request, response){

    let listaGeneros = await controllerGeneros.getListarGeneros()

    if(listaGeneros){
        response.json(listaGeneros)
        response.status(200)
    }else{
        response.json({erro:'Os dados não foram encontrados'})
        response.status(404)
    }
})

//Endpoint :  retornar genero pelo id 
app.get('/v2/AcmeFilmes/genero/:id', cors(), async function (request, response){

    let idGenero = request.params.id
    let genero = await controllerGeneros.getBuscarGenero(idGenero)

    if(genero){
        response.json(genero)
        response.status(200)
    }else{
        response.json({erro:'Os dados não foram encontrados'})
        response.status(404)
    }
})

//Endpoint :  adicionar um novo genero
app.post('/v2/AcmeFilmes/genero', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.header('content-type')
    let dadosBody = request.body
    let resultadoNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)

    response.json(resultadoNovoGenero)
})

//Endpoint : atualizar um genero
app.put('/v2/AcmeFilmes/genero/:id', cors(), bodyParserJSON, async  function(request, response){

    let idGenero = request.params.id
    let contentType = request.header('content-type')
    let dadosBody = request.body
    let generoAtualizado = await controllerGeneros.setAtualizarGenero(idGenero, dadosBody, contentType)

    response.json(generoAtualizado)
    response.status(generoAtualizado.status_code)
})


//Endpoint :  excluir um genero
app.delete('/v2/AcmeFilmes/genero/:id', cors(), bodyParserJSON, async function(request, response){

    let idGenero = request.params.id
    let generoDeletado = await controllerGeneros.setExcluirGenero(idGenero)

    response.json(generoDeletado)
    response.status(generoDeletado.status_code)
})

// *************************************************************************

/**************************** CLASSIFICAÇÃO ********************************/

//Endpoint : lista de classificacoes do banco de dados
app.get('/v2/AcmeFilmes/classificacoes', cors(), async (request, response) =>{

    let listaDeClassificacoes = await controllerClassificacoes.getListarClassificacoes()

    if(listaDeClassificacoes){
        response.json(listaDeClassificacoes)
        response.status(200)
    }else{
        response.json({erro:'Os dados não foram encontrados'})
        response.status(404)
    }
})

//Endpoint : retorna dados da classificacoes pelo id
app.get('/v2/AcmeFilmes/classificacoes/:id', cors(), async function (request, response){

    let idClassificacao = request.params.id
    let classificacao = await controllerClassificacoes.getBuscarClassificacao(idClassificacao)

    if(classificacao){
        response.json(classificacao)
        response.status(200)
    }else{
        response.json({erro:'Os dados não foram encontrados'})
        response.status(404)
    }

})

//Endpoint : filtro para adicionar uma nova classificacao
app.post('/v2/AcmeFilmes/classificacoes', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.header('content-type')
    let dadosBody = request.body
    let resultadoDadosNovaClassificacaco = await controllerClassificacoes.setInserirNovaClassificacao(dadosBody, contentType)
    
    response.status(resultadoDadosNovaClassificacaco.status_code)
    response.json(resultadoDadosNovaClassificacaco)
})

//Endpoint : filtro para atualizar uma nova classificacao
app.put('/v2/AcmeFilmes/classificacoes/:id', cors(), bodyParserJSON, async function(request, response){

    let idClassificacao = request.params.id
    let contentType = request.header('content-type')
    let dadosBody = request.body
    let classificacaoAtualizada = await controllerClassificacoes.setAtualizarClassificacao(dadosBody,idClassificacao, contentType)

    response.json(classificacaoAtualizada)
    response.status(classificacaoAtualizada.status_code)
})

//Endpoint : filtro para deletar uma classificacao
app.delete('/v2/AcmeFilmes/classificacoes/:id', cors(), bodyParserJSON, async function(request, response){

    let idClassificacao = request.params.id
    let classificacaoDeletada = await controllerClassificacoes.setExcluirClassificacao(idClassificacao)

    response.json(classificacaoDeletada)
    response.status(classificacaoDeletada.status_code)
})

// *************************************************************************

/***************************** NACIONALIDADE *******************************/

//Endpoints : retorna a lista de nacionalidades do banco de dados
app.get('/v2/AcmeFilmes/nacionalidades', cors(), async (request, response) =>{

    let allNacionalidades = await controllerNacionalidade.getListarNacionalidade()

    if(allNacionalidades){
        response.json(allNacionalidades)
        response.status(200)
    }else{
        response.json({erro:'Os dados não foram encontrados'})
        response.status(404)
    }
})

// *************************************************************************

//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições');
});