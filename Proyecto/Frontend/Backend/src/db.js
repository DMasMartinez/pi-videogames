require("dotenv").config();
const { Sequelize } = require("sequelize");
// hoooolllllaaaaa
const { USER, PASSWORD, HOST, PORT, BDD, DB_DEPLOY } = process.env;
const Gamefunction = require("./models/game");
const Genrefunction = require("./models/genre");
console.log(BDD);
const database = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
  { logging: false }
);
// const database = new Sequelize(DB_DEPLOY, {
//   dialect: "postgres",
//   logging: false,
//   native: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // Usar false si no tienes un certificado de CA válido
//     },
//   },
// });
Gamefunction(database);
Genrefunction(database);

const { Game, Genre } = database.models;
Game.belongsToMany(Genre, { through: "GamesGenres" });
Genre.belongsToMany(Game, { through: "GamesGenres" });

module.exports = {
  database,
  ...database.models,
};
