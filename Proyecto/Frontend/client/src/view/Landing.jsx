import { useNavigate } from "react-router-dom";
import videogames_image from "./Videogames-Graphics-46817874-1.png"
import '../styles/Landing.css'
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { allgames } from "../redux/actions";
import { setallgames } from "../redux/actions";
const Landing =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const juegos = useSelector(state=>state.juegos)
    const gamesbdd = useSelector(state=>state.juegosbdd)
    const currentgames = juegos
    function gohome(){
        navigate('/home')

    }
    
    useEffect(()=>{
        return (()=>{
            dispatch(allgames())
        })
        
        // listatoconcat()
    },[])
    
    return(
        <div class="container">
            <button class="boton" onClick={()=>gohome()}>Home</button>
            <img src={videogames_image}/>
        </div>
    )
}

export default Landing;