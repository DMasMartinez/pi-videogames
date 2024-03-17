
import { useEffect, useState } from "react"
import Gamecard from "../components/Gamecard"
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setpage } from "../redux/actions";
import errorimagen from "../utils/errorr.gif"
import "../styles/Search.css"

const Search =(props)=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const gamesearch = useSelector(state=>state.juegosearch)
    const gamesbdd = useSelector(state=>state.juegosbdd)
    const pagina = useSelector(state=>state.page)
    const qt = useSelector(state=>state.qt)
    const [listoconcat,setListoconcat]=useState([])
    const gamesearchtoshow = gamesearch
    

    function backtohome(){
        // dispatch(setpage(gamesearch[0].id,qt))
        navigate('/home')
    }
    function comparacion(){
        const actualval = props.name
        const lista = []
        for (var k=0;k<gamesbdd.length;k++){
            for (var i=0;i<gamesbdd[k].name.length;i++){
                if (gamesbdd[k].name.length-4>i){
                    lista.push([gamesbdd[k].name.slice(i,i+4),k])
                }
            }
        }
        
        const result = lista.map((obj)=>{
            if (actualval.includes(obj[0])){
                return gamesbdd[obj[1]]
            }
        })
        return setListoconcat(result)
    }
    useEffect(()=>{
        comparacion()
        if (listoconcat.length>0){
            gamesearchtoshow.concat(listoconcat)
        }
    },[props.name])

    console.log(gamesearchtoshow)
    return (
        <div className="contenedor-search">
            {/* <button onClick={backtohome} className="button-search">
                back
            </button> */}
            {gamesearchtoshow.length>0?gamesearchtoshow.map((game)=>{
                return (
                    <div className="elemento-search">
                        <Gamecard
                            id={game.id}
                            name={game.name}
                            description={game.description}
                            image={game.image}
                            release={game.release}
                            devices={game.devices}
                            ratings={game.ratings}
                            genres={game.Genres?Object.values(game.Genres)?.map((game)=>game.genre):null}
                        />
                    </div>
                )
            }):(<div className="notfound"><img src={errorimagen}/></div>)}
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