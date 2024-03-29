/*****************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 30/01/2024
 * Autor: Emily Crepaldi
 * Versão: 1.0
 * 
 *****************************************************************************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//Instanciando a classe do PrismaClient
const prisma = new PrismaClient();

// função para inserir um Filme no Banco de Dados
const insertFilme = async function (dadosFilme) {
 
    try {

    // cria variável sql
    let sql;

    // validação para verificar se a data de relançamento é vazia, pois devemos ajustar
    //    o script SQL para o BD --- OBS: essa condiçãp é provisória, já que iremos tratar
    //    no BD com uma procedure
    if (dadosFilme.data_relancamento == null ||
        dadosFilme.data_relancamento == undefined ||
        dadosFilme.data_relancamento == ''
    ) {
        sql = `insert into tbl_filme (nome,
                                    sinopse,  
                                    duracao,
                                    data_lancamento,
                                    data_relancamento,
                                    foto_capa,
                                    valor_unitario
                                    ) values (
                                    '${dadosFilme.nome}',
                                    '${dadosFilme.sinopse}',
                                    '${dadosFilme.data_lancamento}',
                                    null,
                                    '${dadosFilme.foto_capa}',
                                    '${dadosFilme.valor_unitario}'
                                        )`
    } else {
        sql = `insert into tbl_filme (nome,
                                    sinopse,  
                                    duracao,
                                    data_lancamento,
                                    data_relancamento,
                                    foto_capa,
                                    valor_unitario
                                    ) values (
                                    '${dadosFilme.nome}',
                                    '${dadosFilme.sinopse}',
                                    '${dadosFilme.data_lancamento}',
                                    null,
                                    '${dadosFilme.foto_capa}',
                                    '${dadosFilme.valor_unitario}'
                                      )`

    }

    // $executeRawUnsafe() - serve para executar scripts sql que não retornam valores (insert, update e delete)
    // $queryRawUnsafe() - serve para executar scripts sql que retornam dados do BD (select)
    let resul = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true;
    else
        return false;
    } catch (error) {
        return false;
    }
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
    if (rsFilmes.lenght > 0)
        return rsFilmes;
    else
        return false;

}

// função para buscar um Filme no Banco de Dados filtrando pelo ID
const selectByIdFilme = async function (id) {

    try {
        // Script SQL para pesquisar o filme pelo ID
        let sql = `select * from tbl_filme where id = ${id}`;

        // Executa o script SQL no BD e retorna o filme
        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch (error) {
        return false;
    }



}

const selectByFilterFilme = async function () {

    let sql = `select * from tbl_filme where id = ${id}`;
}


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}



