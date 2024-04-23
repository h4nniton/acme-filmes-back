/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no Banco de Dados MySQL
 * Data: 16/04/2024 
 * Autor: Emily Crepaldi
 * Versão: 1.0
 *********************************************************************************************/

// Import da biblioteca do PrismaClient
const {PrismaClient } = require('@prisma/client');

// Iniciando a classe do PrismaClient
const prisma = new PrismaClient();

const insertGenero = async function(dadosGenero){

    let sql;

    try {

        sql = `insert into tbl_genero (nome) values`

    }

}