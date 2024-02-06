/*****************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024
 * Autor: Emily Crepaldi
 * Versão: 1.0
 * 
 *****************************************************************************************/

// Import da biblioteca do prisma client
const {PrismaClient} = require('@prisma/client')

//Instanciando a classe do PrismaClient
const prisma = new PrismaClient();
 
// função para inserir um Filme no Banco de Dados
const insertFilme = async function () {

}

// função para atualizar um Filme no Banco de Dados
const updateFilme = async function () {

}

// função para excluir um Filme no Banco de Dados
const deleteFilme = async function () {

}

// função para retornar um Filme no Banco de Dados
const selectAllFilmes = async function () {

    // script sql para buscar todos os registros do BD
    let sql = 'select * from tbl_filme'

    /*
        $queryRawUnsafe(sql)                     ---  Encaminha uma variável
        $queryRaw('select * from tbl_filme')     ---  Encaminha direto o script

    */

    // Executa o script sql no BD e guarda o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    // Validação para retornar os dados ou retornar false
    if(rsFilmes.lenght > 0)
        return rsFilmes;
    else
        return false;

}

// função para buscar um Filme no Banco de Dados filtrando pelo ID
const selectById = async function () {

}


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectById
}