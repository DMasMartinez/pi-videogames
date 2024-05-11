require("dotenv").config();

const server = require("./src/server");
const { database } = require("./src/db");

const port = process.env.PORT || 3001;
database
  .sync({ force: true })
  .then(async () => {
    await server.listen(port, () => {
      console.log(`abriendo servidor en terminal ${port}`);
      console.log(database);
    });
  })
  .catch((error) => console.log(error));
