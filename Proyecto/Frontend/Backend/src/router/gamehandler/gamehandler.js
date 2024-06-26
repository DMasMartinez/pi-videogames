const { Router } = require("express");
const gamehandler = Router();

const findallgames = require("./controllers/findallgames");
const findgamebyname = require("./controllers/findgamebyname");
const findgamebyid = require("./controllers/findgamebyid");
const creategame = require("./controllers/creategame");
const uploadGamePicture = require("../middleware/uploadGamePicture");

// gamehandler.get('/',async(req,res)=>{
//     try{
//         const allgames = await findallgames()
//         res.status(200).json(allgames)
//     }catch(error){
//         res.status(500).json({error:error.message})
//     }
// })

gamehandler.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const gamebyname = name ? await findgamebyname(name) : await findallgames();
    res.status(200).json(gamebyname);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

gamehandler.post(
  "/upload-profile-picture",
  uploadGamePicture,
  async (req, res) => {
    try {
      console.log(req.file.path);
      const imageUrl = req.file.path;
      res.status(200).json({ imageUrl: imageUrl });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

gamehandler.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gamebyid = await findgamebyid(id);
    res.status(200).json(gamebyid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

gamehandler.post("/", async (req, res) => {
  try {
    const { id, name, Genres, description, release, image, devices, ratings } =
      req.body;
    const newgame = await creategame({
      id,
      name,
      Genres,
      description,
      release,
      image,
      devices,
      ratings,
    });
    res.status(200).json(newgame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = gamehandler;
