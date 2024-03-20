
import { useLocation } from "react-router-dom"
import '../styles/Detail.css'

const Gamecard = (props) => {
    const location = useLocation()
    return (
        <div className="framegamecard">
            <div className="image">
                <img src={props.image} alt={props.name}/>
            </div>
            <div className="cardtext">
                <div className="nameshow">
                    {location.pathname!=='/home'&&location.pathname!=='/search'?<h2>{props.name}</h2>:<a href={`/detail/${props.id}`}>{props.name}</a>}
                </div>
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.id}</h2>}
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.description}</h2>} 
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.devices}</h2>}
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.release}</h2>}
                {location.pathname!=='/home'&&location.pathname!=='/search'&&<h2>{props.ratings}</h2>}
                {location.pathname==='/home'?<h2>{props.genres.map((genres)=>genres+' ')}</h2>:<h2>{props.genres}</h2>}
            </div>
        </div>
    )
}

export default Gamecard

{/* <h2>{props.genres}</h2> */}