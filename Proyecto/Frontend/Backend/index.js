require("dotenv").config();

const server = require("./src/server");
const { database } = require("./src/db");

const port = 3001;
database
  .sync({ force: true })
  .then(async () => {
    await server.listen(port, () => {
      console.log(`abriendo servidor en terminal ${port}`);
    });
  })
  .catch((error) => console.log(error));

// process.env.PORT ||
