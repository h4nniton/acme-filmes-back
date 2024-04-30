/***********************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no Banco de Dados MySQL
 * Data: 18/04/2024
 * Autora: Emily Crepaldi
 * Versão: 1.0
 * *********************************************************************************/

//import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

//instância da classe prisma client
const prisma = new PrismaClient();

const insertNacionalidade = async (dadosNacionalidade) => {

    let sql

    try {
        if (dadosNacionalidade.data_relancamento != null &&
            dadosNacionalidade.data_relancamento != "" &&
            dadosNacionalidade.data_relancamento != undefined) {


            sql = `INSERT INTO tbl_nacionalidade (nome, 
                                                bandeira
                                         ) values (
                                          '${dadosNacionalidade.nome}',
                                          '${dadosNacionalidade.bandeira}'
                                        )`
        } else {

            sql = `INSERT INTO tbl_nacionalidade (nome, 
                                                 bandeira
                                            ) values (
                                            '${dadosNacionalidade.nome}',
                                            '${dadosNacionalidade.bandeira}'
                                        )`
        }

        let resultado = await prisma.$executeRawUnsafe(sql)

        if (resultado) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateNacionalidade = async (idNacionalidade, dadosNacionalidade) => {

    let sql

    try {
        if (dadosNacionalidade.data_relancamento != null &&
            dadosNacionalidade.data_relancamento != "" &&
            dadosNacionalidade.data_relancamento != undefined) {

            sql = `update tbl_nacionalidade set nome = '${dadosNacionalidade.nome}',
                                                bandeira = '${dadosNacionalidade.bandeira}'
                                                where id = ${idNacionalidade}`

        } else {
            sql = `update tbl_nacionalidade set nome = '${dadosNacionalidade.nome}',
                                            bandeira = '${dadosNacionalidade.bandeira}'
                                            where id = ${idNacionalidade}`
        }

        let resultado = await prisma.$executeRawUnsafe(sql)

        if (resultado) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteNacionalidade = async (id) => {

    try {
        let sql = `delete from tbl_nacionalidade where id=${id}`

        let resultado = await prisma.$executeRawUnsafe(sql)

        if (resultado) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllNacionalidade = async () => {

    try {

        let sql = `select * from tbl_nacionalidade`
        let resultado = await prisma.$queryRawUnsafe(sql)

        if (resultado) {
            return resultado
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectNacionalidadeById = async (id) => {
    try {

        let sql = `select * from tbl_nacionalidade where id = ${id}`
        let resultado = await prisma.$queryRawUnsafe(sql)

        if (resultado) {
            return resultado
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectLastInsertId = async function () {

    try {
        let sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_nacionalidade limit 1`
        let resultado = await prisma.$queryRawUnsafe(sql)
        let id

        resultado.forEach(idNacionalidade => {
            id = Number(idNacionalidade.id)
        })

        if (id) {
            return id
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAtorByAtorNacionalidade = async function () {

    try {

        let sql = `select tbl_nacionalidade.id, tbl_nacionalidade.nome, tbl_nacionalidade.bandeira from tbl_nacionalidade 
        inner join tbl_ator_nacionalidade on tbl_nacionalidade.id=tbl_ator_nacionalidade.id 
        inner join tbl_ator on tbl_ator_nacionalidade.ator_id= tbl_ator.id where tbl_ator.id = ${idAtor};
        `
        let resultado = await prisma.$queryRawUnsafe(sql)

        if (resultado) {
            return resultado
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}



module.exports = {
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectNacionalidadeById,
    selectLastInsertId,
    selectAtorByAtorNacionalidade
}