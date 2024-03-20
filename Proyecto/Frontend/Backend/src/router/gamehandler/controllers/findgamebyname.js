const { Game, Genre } = require('../../../db')
const data = require('../../../utils/datos')
const get_genres = require('../../genrehandler/controllers/get_genres')
const {Op} = require('sequelize')

const findgamebyname =async(name)=>{
    
    const arrayindex = Array.from({ length: 15 }, (_, index) => index+1)
    const allgeneros =await get_genres()
    const idgenre = [1,2]
    const findgame = await Game.findAll({
        where:{ name: {
            [Op.iLike]: `%${name}%`,
          },},
        include:{
            model:Genre,
            attributes:["genre"],
            through:{
                attributes:[],
            }
        }
    })
    if (findgame.length>0){
        const allfindgames = findgame.map((game)=>{
            // const genresgames = game.dataValues.genres
            // game.dataValues.genres = genresgames
            // return game.dataValues
            return game.toJSON()
        })
        return allfindgames
        // const genresgames = findgame.dataValues.genres
        // findgame.dataValues.genres = genresgames// creamos la propiedad genres y le anadimos lo que conseguirmos por api
        // return findgame.dataValues
    }else{
        const newgame = await fetch(`https://api.rawg.io/api/games?search=${name}&key=c58977baa48f48a2b4a0cb43a9436d91`)
        const data = await newgame.json()
        
        // for (var i=0;i<allgeneros.length;i++){
        //     currentlygame = {"id":i,"genre":allgeneros[i]}
        //     for (var j=0;j<gamegenre.length;j++){
        //         if (currentlygame.genre===gamegenre[j]){
        //             idgenre.push(currentlygame.id)
        //         }
        //     }
        // }
        const allnewaas = arrayindex.map(async(index)=>{
            const gamegenre = data.results[index].genres.map(genre=>genre.name)
            const ides = allgeneros.filter((genre)=>gamegenre.includes(genre.genre)).map((genre)=>genre.id)
            const newaas = await Game.create({
                    "id":data.results[index].id.toString(),
                    "name":data.results[index].name,
                    "devices": data.results[index].platforms?.map((plat) => plat.platform.name),
                    "release": data.results[index].released,
                    "image": data.results[index].background_image,
                    "ratings": data.results[index].rating,
                    "description": data.results[index].description,

            })
            await newaas.addGenres(ides)
            return newaas.dataValues

        })
        
        const newaastoshow = await Promise.all(allnewaas)

        // return newaastoshow

        

        const reproduce = newaastoshow.map(async(game)=>{
            const object = await Game.findByPk(game.id,{
                include:{
                    model:Genre,
                    attributes:["genre"],
                    through:{
                        attributes:[]
                    }
                }
            })
            // if (object!=null){
            //     const gen = object.dataValues.genres
            //     object.dataValues.genres = gen
            //     return object.dataValues
            // }
            return object.dataValues
            
        })
        const reproducepromise = Promise.all(reproduce)
        return reproducepromise
        // const objectoshow = await Game.findByPk(newaas.id,{
        //     include:{
        //         model:Genre,
        //         attributes:["genre"],
        //         through:{
        //             attributes:[]
        //         }
        //     }
        // })
        // return objectoshow.dataValues
       
    }
}

module.exports = findgamebyname;