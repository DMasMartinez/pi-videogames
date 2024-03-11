import { useEffect, useState } from "react"
import Gamecard1 from "../components/Gamecard1"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setpage } from "../redux/actions"
import '../styles/marcoshowdetail.css'

const Detail = (props) => {
    const {id} = useParams()
    const [game,setGame] = useState({})
    const [generos,setGeneros] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pagina = useSelector(state=>state.page)
    const qt = useSelector(state=>state.qt)
    useEffect(()=>{
        fetch(`http://localhost:3001/game/${id}`)
            .then(res=>res.json())
            .then(data=>setGame(data))
    },[id])
    useEffect(()=>{
        fetch(`http://localhost:3001/game/${id}`)
            .then(res=>res.json())
            .then(data=>setGeneros(data.Genres.map((game)=>game.genre)))
    },[id])
    console.log(pagina)
    function backtocurrentpage(){
        dispatch(setpage(game.id,qt))
        navigate('/home')
    }

    return (
        <div class="container">
            <button onClick={backtocurrentpage}>
                back
            </button>
            <Gamecard1
                id={game.id}
                name={game.name}
                description={game.description}
                image={game.image}
                release={game.release}
                devices={game.devices}
                ratings={game.ratings}
                genres={generos}
            />
            
        </div>
    )
}

export default Detail

// genres={generos}