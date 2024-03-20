import { useLocation } from "react-router-dom"
import '../styles/Showdetail.css'


const Gamecard1 = (props) => {
    const location = useLocation()
    return (
        <div className="framegame">
            <div className="imagen">
                <img src={props.image} alt={props.name}/>
            </div>

            <div className="cardtexto">
                {location.pathname!=='/home'&&location.pathname!=='/search'?<h2>{props.name}</h2>:<a href={`/detail/${props.id}`}>{props.name}</a>}
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.id}</h2>}
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.description}</h2>} 
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.devices}</h2>}
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.release}</h2>}
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.ratings}</h2>}
                <h2>{props.genres}</h2>
            </div>
        </div>
    )
}

export default Gamecard1