import Gamecard from "../components/Gamecard"
import { useEffect } from "react"
import '../styles/Showgames.css'
import { useSelector, useDispatch } from "react-redux"
import { allgames, setallgames } from "../redux/actions"
import Pagination from "./Pagination"
import { useState } from "react"
import { setpagedown,setpageup,setcount } from "../redux/actions"
import loadingif from "../utils/loading.webp"
import { useLocation } from "react-router-dom"
const Home =(props)=>{
    const location = useLocation()
    const [generobdd,setGenerobdd] = useState([])
    const dispatch = useDispatch()
    const [qt,setQt] = useState(15)
    // const [page,setPage] = useState(1)
    const juegos = useSelector(state=>state.juegos)
    const pagina = useSelector(state=>state.page)
    const count = useSelector(state=>state.count)
    const gamesbdd = useSelector(state=>state.juegosbdd)
    const juegostoshow = juegos
    // const initidx = props.qt*props.page-props.qt
    // const finalidx = props.qt*props.page
    // const initidx = qt*page-qt
    // const finalidx = qt*page
    const initidx = qt*pagina-qt
    const finalidx = qt*pagina
    let currentgames = juegos
    const [aux,setAux]=useState([])
    
    // function listatoconcat(){
    //     if (gamesbdd.length>0){
    //         setAux([...currentgames,...gamesbdd])
    //         dispatch(setallgames(aux))
    //     }
    // }

    useEffect(()=>{
        dispatch(allgames())
    },[])



    // useEffect(()=>{
    //     if (count===0){
    //         dispatch(allgames())
    //         listatoconcat()
    //     }
    //     // dispatch(setcount(count))
    // },[])


    console.log(juegos)
    return juegos.length>0?(
        <div className="contenedor">
            
            {juegos.slice(initidx,finalidx).map((game)=>{
                return (
                    <div className="elemento">
                        <Gamecard
                            id={game.id}
                            name={game.name}
                            description={game.description}
                            image={game.image}
                            release={game.release}
                            devices={game.devices}
                            ratings={game.ratings}
                            genres={location.pathname==='/home'?game.Genres:game.Genres.map((game)=>game.genre+' ')}
                        />
                    </div>

                )
            })}
            <div className="botonpaginado">
                <Pagination qt={qt} juegos={juegos}/>
            </div>
            {/* <div>
                <button onClick={()=>previouspage()}>previous</button>
                <button onClick={()=>nextpage()}>next</button>
            </div> */}
        </div>

    ):<div className="loadinghome"><img src={loadingif}/></div>
}

export default Home

// genres={game.Genres.map((game)=>game.genre+' ')}

// genres={game.Genres?game.Genres.map((game)=>game.genre+' '):generobdd.map((game)=>game.genre+' ')}