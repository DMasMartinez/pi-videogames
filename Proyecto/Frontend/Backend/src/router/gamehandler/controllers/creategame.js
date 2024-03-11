const {Game, Genre} = require('../../../db')
const get_genres = require('../../genrehandler/controllers/get_genres')
const creategame = async(data) =>{
    const {id,name,Genres,description,release,image,devices,ratings} = data
    const allgeneros = await get_genres()
    const putgenres = allgeneros.filter((genre)=>Genres===genre.genre)[0].id
    const newgame = {
        "id":id,
        "name":name,
        "description":description,
        "release":release,
        "image":image,
        "devices":devices,
        "ratings":ratings,
        "Genres":[3]
    }
    const newobject = await Game.create(newgame)
    newobject.addGenre(putgenres)
    return newobject.dataValues 
}


module.exports = creategame; 