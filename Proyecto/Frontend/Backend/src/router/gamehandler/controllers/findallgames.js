const { Game, Genre } = require("../../../db");

const findallgames = () => {
  const allgames = Game.findAll({
    include: {
      model: Genre,
      attributes: ["genre"],
      through: {
        attributes: [],
      },
    },
  });
  return allgames;
};

module.exports = findallgames;
