

require('dotenv').config()
const {Sequelize} = require('sequelize')
// hoooolllllaaaaa
const {USER,PASSWORD,HOST,PORT,BDD} = process.env;
const Gamefunction = require('./models/game')
const Genrefunction = require('./models/genre')

const database = new Sequelize(
     `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
     { logging:false }
);
Gamefunction(database)
Genrefunction(database)

const { Game,Genre } = database.models
Game.belongsToMany(Genre,{through:"GamesGenres"})
Genre.belongsToMany(Game,{through:"GamesGenres"})

module.exports = {
     database,
     ...database.models,
};