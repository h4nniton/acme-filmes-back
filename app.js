//Import das bibliotecas para criar a API
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


//Criando um objeto para manipular as requisições da API  (como instância de objeto no JAVA)
const app = express()

//request - Entrada de dados na API (recebe)
//response - Saída(return) de dados na API (devolve)

//pacotes no protocolo http - cabeçalho(header) - onde ficam as referências (de onde vem, pra onde, permissões)
//                          - corpo(body)