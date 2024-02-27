var acmeFilmes = require('../modulo/filmes.js');

const getListarFilmes = functions({

    let filmes = acmeFilmes.filmes.filmes

    filmJson = {}
    filmArray = []

    filmJson.filmes = filmArray
    
    filmes.forEach(function(filmes){
        filmArray.push(filmes)
    })

    return filmJson
})

