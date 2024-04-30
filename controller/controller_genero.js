/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio
 * para os generos.
 * Data: 16/04/2024 
 * Autor: Emily Crepaldi
 * Versão: 1.0
 *********************************************************************************************/

//import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//import do arquivo responsável pela interação com o banco de dados
const generoDAO = require('../model/DAO/genero.js');

//função para inserir um novo genero
const setInserirNovoGenero = async function (dadosGenero, contentType) {

    try{
    
    //validação de content-type (apenas a application/json)
    if (String(contentType).toLowerCase() == 'application/json'){

    //cria o objeto JSON paa devolver os dados  criados na requisição
    let generoAtualizadoJSON = {};

    //validação de campos obrigatórios ou com digitação inválida
    if (dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome == null || dadosGenero.nome.length > 80
    ) {

        return message.ERROR_REQUIRED_FIELDS //400

    } else {

            //encaminha os dados do genero para o DAO inserir no banco de dados
            let novoGenero = await generoDAO.insertFilme(dadosGenero)
            let idNovoGenero = await generoDAO.selectLastInsertId()

            //validação para verificar se o DAO inseriu os dados do BD
            if (novoGenero) {

                //Cria o JSON de retorno dos dados (201)
                generoAtualizadoJSON.filme = dadosGenero
                generoAtualizado.filme.id = Number(idNovoGenero)
                generoAtualizado.status = message.SUCCESS_CREATED_ITEM.status
                generoAtualizado.status_code = message.SUCCESS_CREATED_ITEM.status_code
                generoAtualizado.message = message.SUCCESS_CREATED_ITEM

                return generoAtualizadoJSON //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
}else{
    return message.ERROR_CONTENT_TYPE //415
}
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
    
}

//função para atualizar um genero
const setAtualizarGenero = async function (idGenero, dadosGenero, contentType) {

    try {
        if(String(contentType).toLowerCase() == 'application/json'){
            
            let generoAtualizadoJSON = {};

            if (idGenero == "" || idGenero == undefined || idGenero(isNaN)) {

                return message.ERROR_INVALID_ID

            } else {

                let generoAtualizado = await generoDAO.updateGenero(idGenero, dadosGenero)

                if (generoAtualizado) {
                    generoAtualizadoJSON.genero = dadosGenero
                    generoAtualizadoJSON.genero.id = idGenero
                    generoAtualizadoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                    generoAtualizadoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    generoAtualizadoJSON.message = message.SUCCESS_UPDATED_ITEM.message

                    return generoAtualizadoJSON
                } else {
                    message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//função para excluir um genero
const setExcluirGenero = async function (idGenero) {

    try {
        //validação do id
        if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID //400
        }else{
            let generoDeletado = await generoDAO.deleteGenero(idGenero)

            if(generoDeletado){
                return message.SUCCESS_DELETED_ITEM //201
            }else{
                return false
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }
}

//função para listar todos os gêneros
const getListarGeneros = async function () {

    //cria um objeto JSON
    let generosJSON = {};

    //chama a função do DAO que retorna os generos do BD
    let dadosGenero = await generoDAO.selectAllFilmes() //-> pede pro generoDAO trazer todos os generos do banco

    //validação para verificar se o DAO retonou dados
    if (dadosGenero) {
        //criar o JSON para desenvolver o APP
        
        generosJSON.generos = dadosGenero;
        generosJSON.quantidade = dadosGenero.length;
        generossJSON.status_code = 200

        return generosJSON
    } else {
        return false
    }
}

//função para buscar um genero pelo id 
const getBuscarGenero = async function (idGenero) {

    //recebe o id do genero
    let idGenero = id;

    //cria o objeto JSON
    let generoJSON = {};

    //validação para verificar se o id é válido (vazio, inefiido e não numérico)
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID //400
    } else {

        //encaminha para o DAO localizar o id do filme
        let dadosGenero = await generoDAO.selectByIdGenero(idGenero)

        //validação para verificar se existe dados de retorno
        if (dadosGenero) {

            //validação para verificar a quantidade de itens encontrado
            if (dadosGenero.length > 0) {
                //cria o JSON de return
                generoJSON.genero = dadosGenero;
                gerenoJSON.status_code = 200
                return generoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGeneros,
    getBuscarGenero
}