/*****************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistências e regra de negócio
 *     para os filmes
 * Data: 30/01/2024
 * Autor: Emily Crepaldi
 * Versão: 1.0
 * 
 *****************************************************************************************/

// Import do arquivo DAO para manipular dados dos filmes
const filmesDAO = require('../modulo/DAO/filme.js');

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
    let dadosFilmes = filmesDAO.selectAllFilmes();

    // Validação para criar o JSON dos dados
    if (dadosFilmes) {
        // Cria o JSON de retorno dos dados
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200;
    } else {
        return false;
    }

}

// função para retornar o filtro de um Filme pelo ID
const getBuscarFilme = async function () {

}


module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getListarFilmes
}