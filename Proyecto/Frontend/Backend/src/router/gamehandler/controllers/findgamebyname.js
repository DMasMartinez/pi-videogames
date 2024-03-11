const { Game, Genre } = require('../../../db')
const data = require('../../../utils/datos')
const get_genres = require('../../genrehandler/controllers/get_genres')

const findgamebyname =async(name)=>{
    

    const allgeneros = await get_genres()
    const idgenre = [1,2]
    const findgame = await Game.findOne({
        where:{name:name},
        include:{
            model:Genre,
            attributes:["genre"],
            through:{
                attributes:[],
            }
        }
    })
    if (findgame!=null){
        const genresgames = findgame.dataValues.genres
        findgame.dataValues.genres = genresgames// creamos la propiedad genres y le anadimos lo que conseguirmos por api
        return findgame.dataValues
    }else{
        const newgame = await fetch(`https://api.rawg.io/api/games?search=${name}&key=5ecc473d08d046d7925a099b7b9ed02e`)
        const data = await newgame.json()
        const gamegenre = data.results[0].genres.map(genre=>genre.name)
        const ides = allgeneros.filter((genre)=>gamegenre.includes(genre.genre)).map((genre)=>genre.id)
        // for (var i=0;i<allgeneros.length;i++){
        //     currentlygame = {"id":i,"genre":allgeneros[i]}
        //     for (var j=0;j<gamegenre.length;j++){
        //         if (currentlygame.genre===gamegenre[j]){
        //             idgenre.push(currentlygame.id)
        //         }
        //     }
        // }
        const newaas = await Game.create({
            "id":data.results[0].id.toString(),
                "name":data.results[0].name,
                "devices": data.results[0].platforms?.map((plat) => plat.platform.name),
                "release": data.results[0].released,
                "image": data.results[0].background_image,
                "ratings": data.results[0].rating,
                "description": data.results[0].description,
                "genres":ides
        })

        newaas.addGenre(ides)
    return newaas
    }

    
}

module.exports = findgamebyname;