
const { Router } = require('express')
const get_genres = require('./controllers/get_genres')
const { Genre } = require('../../db')
const genrehandler = Router()

genrehandler.get('/',async(req,res)=>{
    try{
        const genres = await get_genres()
        res.status(200).json(genres)
    }catch(error){
        res.status(500).json({error:error.message})
    }
    
})

module.exports = genrehandler;