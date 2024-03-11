
import { useEffect, useState } from "react"
import Gamecard from "../components/Gamecard"
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setpage } from "../redux/actions";
const Search =(props)=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const gamesearch = useSelector(state=>state.juegosearch)
    const pagina = useSelector(state=>state.page)
    const qt = useSelector(state=>state.qt)
    // const [generos,setGeneros] = useState([])

    // useEffect(()=>{
    //     fetch(`http://localhost:3001/game/?name=${"Portal 2"}`)
    //         .then(res=>res.json())
    //         .then(data=>setGeneros(data.Genres.map((genre)=>genre.genre)))
    // },[])
    // console.log(props.games)
    // const generos = props.games[props.games.length-1].Genres
    // const newgeneros = Object.values(generos)
    // const generoshow = newgeneros.map((game)=>game.genre)
    // console.log(generoshow)
    // console.log(newgeneros)
    function backtohome(){
        dispatch(setpage(gamesearch[0].id,qt))
        navigate('/home')
    }
    // console.log(pagina)
    return (
        <div>
            <button onClick={backtohome}>
                back
            </button>
            {gamesearch.map((game)=>{
                return (
                    <Gamecard
                        id={game.id}
                        name={game.name}
                        description={game.description}
                        image={game.image}
                        release={game.release}
                        devices={game.devices}
                        ratings={game.ratings}
                        genres={Object.values(game.Genres)?.map((game)=>game.genre)}
                    />

                )
            })}
        </div>
    )
}

export default Search

{/* <div>
            <h2>Search</h2>
            {props.games.map((game)=>{
                return (
                    <Gamecard
                        id={game.id}
                        name={game.name}
                        description={game.description}
                        image={game.image}
                        release={game.release}
                        devices={game.devices}
                        ratings={game.ratings}
                        genres={Object.values(game.Genres)?.map((game)=>game.genre)}
                    />

                )
            })}
        </div> */}