import { useNavigate } from "react-router-dom";
import '../styles/Landing.css'
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { allgames } from "../redux/actions";
import { setallgames } from "../redux/actions";
import mando from "../utils/pngegg.png"
import figura from "../utils/figuralanding.gif"
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
        <>
        <div className="container">
            <img className="boton" src={mando} alt="mando" onClick={()=>gohome()}/>
            <img src={figura} alt="figura" className="imagengif" onClick={()=>gohome()}/> 
        </div>

        </>
    )
}

export default Landing;