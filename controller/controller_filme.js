/*****************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio
 *     para os filmes
 * Data: 30/01/2024
 * Autor: Emily Crepaldi
 * Versão: 1.0
 * 
 *****************************************************************************************/

// Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js');

// Import do arquivo DAO para manipular dados dos filmes
const filmesDAO = require('../model/DAO/filme.js');
const { itxClientDenyList } = require('@prisma/client/runtime/library.js');

// função para inserir um novo filme
const setInserirNovoFilme = async function () {

}

// função para atualizar um Filme existente
const setAtualizarFilme = async function () {

}

// função para excluir um Filme existente
const setExcluirFilme = async function () {

}

// função para retornar todos os Filme dos banco de dados
const getListarFilmes = async function () {

    // Cria o objeto JSON
    let filmesJSON = {};

    // Chama a função do DAO para retornar os dados do banco
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    // Validação para criar o JSON dos dados
    if (dadosFilmes) {
        // Cria o JSON de retorno dos dados
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        
        return filmesJSON;
    } else {
        return false;
    }

}

// função para retornar o filtro de um Filme pelo ID
const getBuscarFilme = async function (id) {

    // Recebe o ID encaminhado pelo APP
    let idFilme = id;

    // Variável do tipo JSON
    let filmesJSON = {};

    // Validação para verificar o ID do filme antes de encaminhar para o DAO
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID;
    } else {
        // Encaminha o ID do filme para o DAO para o retorno do banco de dados
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme);

            // Validação para verificar se o DAO retornou os dados
            if (dadosFilme){

                if (dadosFilme.length > 0) {
                // Monta o JSON com o retorno dos dados
                filmesJSON.filme = dadosFilme;
                filmesJSON.status_code = 200;
                
                return filmesJSON;

                } else {
                    return message.ERROR_NOT_FOUND;
                }
                
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
    }

}

const getFiltrarFilme = async function () {}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getListarFilmes,
    getBuscarFilme,
    getFiltrarFilme
}


you´re insecure
don´t know what for
you turn heads when you walk through the do-oor
don´t need makeup to cover up being the way that you are is eno-ough

everyone else in the room can see it
everyone else but you

baby you light up my world like nobody else
the way that you flip your hair gets me overwhelmed
but when you smile at the ground and its hard to tell 
you don't kno-oow you don't know you're beautiful