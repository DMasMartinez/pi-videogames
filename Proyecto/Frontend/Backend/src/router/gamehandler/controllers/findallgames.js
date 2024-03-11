const {Game, Genre} = require('../../../db')
const data = require('../../../utils/datos')

const findallgames = () =>{
    const allgames = Game.findAll()
    return allgames

}

module.exports = findallgames;