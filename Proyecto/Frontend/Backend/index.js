

const server = require('./src/server')
const {database} = require('./src/db')
const findallgames = require('./src/router/gamehandler/controllers/findallgames')
const findgamebyname = require('./src/router/gamehandler/controllers/findgamebyname')
const findgamebyid = require('./src/router/gamehandler/controllers/findgamebyid')
const get_genres = require('./src/router/genrehandler/controllers/get_genres')
const creategame = require('./src/router/gamehandler/controllers/creategame')
const PORT = 3001


database.sync({force:true}).then(async()=>{
    await server.listen(PORT,()=>{
        console.log(`abriendo servidor en terminal ${PORT}`)
    })
    try{
        // const result = await get_genres()
        // console.log(result)
        // const result = await findgamebyid("4200")
        // console.log(result)
        // const result = await findgamebyname("Alien Space Retro")
        // console.log(result)
        // const result = await creategame({
        //     "id":"30",
        //     "name":"nawsss",
        //     "description":"",
        //     "release":"",
        //     "image":"",
        //     "devices":["PS1"],
        //     "ratings":"",
        //     "Genres":[1,2]
        //   })
        // console.log(result)
    }catch(error){
        console.log(error)
    }
}).catch(error=>console.log(error))
