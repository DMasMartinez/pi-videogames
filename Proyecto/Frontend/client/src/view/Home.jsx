import Gamecard from "../components/Gamecard"
import { useEffect } from "react"
import '../styles/Showgames.css'
import { useSelector, useDispatch } from "react-redux"
import { allgames } from "../redux/actions"
import Pagination from "./Pagination"
import { useState } from "react"
import { setpagedown,setpageup } from "../redux/actions"

const Home =(props)=>{
    const [generobdd,setGenerobdd] = useState([])
    const dispatch = useDispatch()
    const [qt,setQt] = useState(4)
    // const [page,setPage] = useState(1)
    const juegos = useSelector(state=>state.juegos)
    const pagina = useSelector(state=>state.page)
    // const initidx = props.qt*props.page-props.qt
    // const finalidx = props.qt*props.page
    // const initidx = qt*page-qt
    // const finalidx = qt*page
    const initidx = qt*pagina-qt
    const finalidx = qt*pagina
    
    
    useEffect(()=>{
        dispatch(allgames())
    },[])

    useEffect(async()=>{
        if (juegos.length<10){
            await fetch(`http:localhost:3001/game/?name=?${juegos.name}`)
                .then(res=>res.json())
                .then(data=>setGenerobdd(data.Genres))
        }
    },[])
    // useEffect(()=>{
    //     props.showgames()
    // },[])
    console.log(generobdd)
    return (
        <div class="contenedor">
            
            {juegos.slice(initidx,finalidx).map((game)=>{
                return (
                    <div class="elemento">
                        <Gamecard
                            id={game.id}
                            name={game.name}
                            description={game.description}
                            image={game.image}
                            release={game.release}
                            devices={game.devices}
                            ratings={game.ratings}
                            genres={game.Genres?game.Genres.map((game)=>game.genre+' '):generobdd.map((game)=>game.genre+' ')}
                        />
                    </div>

                )
            })}
            <Pagination qt={qt} juegos={juegos}/>
            {/* <div>
                <button onClick={()=>previouspage()}>previous</button>
                <button onClick={()=>nextpage()}>next</button>
            </div> */}
        </div>
    )
}

export default Home

// genres={game.Genres.map((game)=>game.genre+' ')}