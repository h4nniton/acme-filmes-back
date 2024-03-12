/***********************************************************************************
 *  Objetivo: Arquivo responsável pelas variáveis globais do projeto, onde haverão
 *              mensagens, stats_code e outros conteúdos para o Projeto
 * Data: 20/02/24
 * Autor: Emily Crepaldi
 * Versão: 1.0
***********************************************************************************/

/************************ MENSAGENS DE ERRO DO PROJETO ****************************/

const ERROR_INVALID_ID               = {status : false, status_code : 400, message : 'O ID encaminhado na requisição não é valido !!!'};
const ERROR_REQUIRED_FIELDS          = {status : false, status_code : 400, message : 'Existem campos obrigatòrios que não foram preenchidos, ou ultrapassaram o limite de caracteres !!!'};
const ERROR_NOT_FOUND                = {status : false, status_code : 404, message : 'Nenhum item encontrado na requisição !!!'};
const ERROR_INTERNAL_SERVER_DB       = {status : false, status_code : 500, message : 'Ocorreram Erros no processamento do banco de dados. Contate o admnistrador da API !!!'};
const ERROR_INTERNAL_SERVER       = {status : false, status_code : 500, message : 'Ocorreram Erros no servidor Back-End na camada de serviços, portanto, não foi possível processar a requisição. Contate o administrador da API !!!'};
const ERROR_CONTENT_TYPE             = {status : false, status_code : 415, message : 'O content-Type da requisição não é suportado na PI. Deve-se encaminhar dados em formato application/json !!!'};

/************************ MENSAGENS DE SUCESSO ***********************************/

const SUCCESS_CREATED_ITEM           = {status : true, status_code : 201, message : 'O item foi criado com sucesso no banco de dados !!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER
}

