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
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {

    if (String (contentType).toLowerCase == 'application/json') {

        let statusValidated = false;
        let novoFilmeJson = {};

        // Cria o JSON de retorno com informações de requisição
        
        if (dadosFilme.nome                      == '' || dadosFilme.nome == undefined                 || dadosFilme.nome == null                 || dadosFilme.nome.length > 80                ||
            dadosFilme.sinopse                   == '' || dadosFilme.sinopse == undefined              || dadosFilme.sinopse == null              || dadosFilme.sinopse.length > 65000          ||
            dadosFilme.duracao                   == '' || dadosFilme.duracao == undefined              || dadosFilme.duracao == null              || dadosFilme.duracao.length > 8              ||
            dadosFilme.data_lancamento           == '' || dadosFilme.data_lancamento == undefined      || dadosFilme.data_lancamento == null      || dadosFilme.data_lancamento.length != 10    ||
            dadosFilme.foto_capa                 == '' || dadosFilme.foto_capa == undefined            || dadosFilme.foto_capa == null            || dadosFilme.foto_capa.length > 200          ||
            dadosFilme.valor_unitario.length  > 8      || isNaN(dadosFilme.valor_unitario)
            ){
                return message.ERROR_REQUIRED_FIELDS;
            } else {

                if (dadosFilme.data_relancamento != ''             &&
                    dadosFilme.data_relancamento != null           &&
                    dadosFilme.data_relancamento != undefined       )
                {
                    if (dadosFilme.data_relancamento.length != 10){
                        return message.ERROR_REQUIRED_FIELDS // 400
                    } else {
                        statusValidated = true;
                    }
                } else {
                        statusValidated = true;
                }


                if (statusValidated){
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme);

                    if (novoFilme){
                        novoFilmeJson.status                 = message.SUCCESS_CREATED_ITEM.status;
                        novoFilmeJson.status_code            = message.SUCCESS_CREATED_ITEM.status_code;
                        novoFilmeJson.message                = message.SUCCESS_CREATED_ITEM.message;
                        novoFilmeJson.filme                  = dadosFilme;

                        return novoFilmeJson; // 201
                        
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB; // 500
                    }
                }

            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER;
    }

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

const getFiltrarFilme = async function () {
    
    let filtroFilme
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getListarFilmes,
    getBuscarFilme,
    getFiltrarFilme
}
