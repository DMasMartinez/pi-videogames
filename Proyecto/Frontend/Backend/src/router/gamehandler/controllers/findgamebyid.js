const {Game, Genre} = require('../../../db')
const get_genres = require('../../genrehandler/controllers/get_genres')

const findgamebyid = async(id) =>{
    const allgeneros = await get_genres()
    const gamebyid = await Game.findByPk(id,{
        include:{
            model:Genre,
            attributes:["genre"],
            through:{
                attributes:[]
            }
        }
    })
    if (gamebyid!=null){
        const genredata = gamebyid.dataValues.genres
        gamebyid.dataValues.genres = genredata
        return gamebyid.dataValues
    }
    const apigame = await fetch(`https://api.rawg.io/api/games/${id}?key=5ecc473d08d046d7925a099b7b9ed02e`)
    const data = await apigame.json()
    const gamegenres = data.genres.map((genre)=>genre.name)
    const ides = allgeneros.filter((genre)=>gamegenres.includes(genre.genre)).map((genre)=>genre.id)


    // const newlist = []
    // const ides = allgeneros.map((genre)=>{
    //     if (gamegenres.includes(genre.genre)){
    //         newlist.push(genre.id)
    //     }
    //     return newlist
    // })
    // const {name,platforms,released,background_image,rating,description} = data
    const newgame = await Game.create({
        "id": data.id.toString(),
        "name": data.name,
        "devices": data.platforms?.map((plat) => plat.platform.name),
        "release": data.released,
        "image": data.background_image,
        "ratings": data.rating,
        "description": data.description,
        "genres": ides
    })
    await newgame.addGenre(ides)
    return newgame.dataValues
}

module.exports = findgamebyid;