/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 17/04/2024 
 * Autor: Emily Crepaldi
 * Versão: 1.0
 *********************************************************************************************/

//import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

//instância da classe prisma client
const prisma = new PrismaClient();

//função para inserir nova classificação no banco de dados
const insertClassificacao = async (dadosClassificacao) => {

    try {

        let sql = `insert into tbl_classificacao ( nome, 
                                                   imagem
                                                   ) values (
                                                     '${dadosClassificacao.nome}', 
                                                     '${dadosClassificacao.icone}'
                                                   )`
    console.log(sql)
        let resultado = await prisma.$executeRawUnsafe(sql)

        if(resultado) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

//função para atualizar uma classificação no banco de dados
const updateClassificacao = async (id, dadosAtualizados) => {
    
        let sql = `update tbl_classificacao set nome = '${dadosAtualizados.nome}',
                                                imagem = '${dadosAtualizados.imagem}',
                                                where id = ${id};`
    
        try {

            let resultado = await prisma.$executeRawUnsafe(sql)
    
        if(resultado) {
            return true
        } else {
            return false
        }
        } catch (error) {
            console.log(error)
            return false
    }
        
}

//função para deletar uma classificação no banco de dados
const deleteClassificacao = async (id) => {

    try {
        let sql = `delete from tbl_classificacao where id=${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return true
        else
        return false
    } catch (error) {
        return false
    }

}

//função para listar todas as classificações do banco de dados
const selectAllClassificacoes = async () => {

    try {
        let sql = `select * from tbl_classificacao`
        let resultado = await prisma.$queryRawUnsafe(sql)
   
        if(resultado){
         return resultado
        } else {
         return false
        }
   
     } catch (error) {
       return false
     }
}

//função para listar dados das classificações com base no ID
const selectClassificacoesById = async (id) => {

    try{

        let sql = `select * from tbl_classificacao where id = ${id}`
        let resultado = await prisma.$queryRawUnsafe(sql)

        if(resultado)
        return resultado
        else
        return false
    }catch(error){
        console.log(error)
        return false
    }
}

//função para listar dados das classificações com base no ID do ultimo dado inserido
const selectLastInsertId = async () => {

    try{

        let sql = `select * from tbl_classificacao where id = ${id}`
        let resultado = await prisma.$queryRawUnsafe(sql)

        if(resultado)
        return resultado
        else
        return false
    }catch(error){
        return false
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacoes,
    selectClassificacoesById,
    selectLastInsertId
}
