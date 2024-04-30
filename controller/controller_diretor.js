/**********************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio
 * para os generos.
 * Data: 17/04/2024 
 * Autor: Emily Crepaldi
 * Versão: 1.0
 *********************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

// instância da classe prisma client
const prisma = new PrismaClient();

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')