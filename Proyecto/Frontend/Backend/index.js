const server = require("./src/server");
const { database } = require("./src/db");

const PORT = 3001;

database
  .sync({ force: true })
  .then(async () => {
    await server.listen(PORT, () => {
      console.log(`abriendo servidor en terminal ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
