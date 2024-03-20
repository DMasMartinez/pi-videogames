
const { Game, Genre } = require('../../../db')
const get_genres=async()=>{
    

    const allgenres = await fetch(`https://api.rawg.io/api/genres?key=c58977baa48f48a2b4a0cb43a9436d91`)
    const data = await allgenres.json()
    const showgenres = data.results.map((genre)=>genre.name)

    const genrestoshow = await Promise.all(showgenres.map(async(genre)=>{
        const [generos] = await Genre.findOrCreate({
            where:{genre:genre}
        })
        return generos.dataValues
    }))

    return genrestoshow
}

module.exports = get_genres;