import { useNavigate } from "react-router-dom";
import videogames_image from "./Videogames-Graphics-46817874-1.png"
import '../styles/Landing.css'
const Landing =()=>{
    const navigate = useNavigate()
    function gohome(){
        navigate('/home')
    }
    
    return(
        <div class="container">
            <button class="boton" onClick={()=>gohome()}>Home</button>
            <img src={videogames_image}/>
        </div>
    )
}

export default Landing;