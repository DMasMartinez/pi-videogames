
const {Router} = require('express')
const router = Router()

const gamehandler = require('./gamehandler/gamehandler')
const genrehandler = require('./genrehandler/genrehandler')

router.use('/game',gamehandler)
router.use('/genre',genrehandler)

module.exports = router