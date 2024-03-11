const {Game, Genre} = require('../../../db')
const data = require('../../../utils/datos')

const findallgames = () =>{
    const allgames = Game.findAll({
        include:{
            model:Genre,
            attributes:["genre"],
            through:{
                attributes:[]
            }
        }
    })
    return allgames

}

module.exports = findallgames;