/***********************************************************************************
 *  Objetivo: Arquivo responsável pelas variáveis globais do projeto, onde haverão
 *              mensagens, stats_code e outros conteúdos para o Projeto
 * Data: 20/02/24
 * Autor: Emily Crepaldi
 * Versão: 1.0
***********************************************************************************/

/************************ MENSAGENS DE ERRO DO PROJETO ****************************/

const ERROR_INVALID_ID = {status : false, status_code : 400, message : 'O ID encaminhado na requisição não é valido !!!'};
const ERROR_NOT_FOUND = {status : false, status_code : 404, message : 'Nenhum item encontrado na requisição !!!'};
const ERROR_INTERNAL_SERVER_DB = {status : false, status_code : 500, message : 'Ocorreram erros no processamento do banco de dados. Contate o admnistrador da API !!!'};

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB
}

