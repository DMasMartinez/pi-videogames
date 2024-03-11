
const { Game, Genre } = require('../../../db')
const get_genres=async()=>{
    

    const allgenres = await fetch(`https://api.rawg.io/api/genres?key=5ecc473d08d046d7925a099b7b9ed02e`)
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