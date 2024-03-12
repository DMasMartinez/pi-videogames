import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { allgames, gamesearch } from "../redux/actions"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { allgenres } from "../redux/actions"
import { setallgames,gamesbdd } from "../redux/actions"
import '../styles/Searchbar.css'

const Searchbar = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const generos = useSelector(state=>state.generos)
    const juegos = useSelector(state=>state.juegos)
    const juegosbdd = useSelector(state=>state.juegosbdd)
    const [name,setName] = useState("")
    const [alfaopt,setAlfaopt] = useState("")
    const [ratingopt,setRatingopt] = useState("")
    const [genero,setGenero] = useState("")
    // const [genress,setGenress] = useState([])

    function busqueda(nombre){
        dispatch(gamesearch(nombre))
        navigate('/search')
    }

    function handlerchange1(event){
        if (event.target.name==="nombre"){
            setName(event.target.value)
        }
    }
    function handlerchange(event){

        if (event.target.name==="alfabetic"){
            const alfaoption = event.target.value
            setAlfaopt(alfaoption)
            if (alfaoption==="A-Z"){
                props.orderalfabetic(juegos,alfaoption)
            }else if (alfaoption==="Z-A"){
                props.orderalfabetic(juegos,alfaoption)
            }
        }
        else if (event.target.name==="rating"){
            const ratingoption = event.target.value
            setRatingopt(ratingoption)
            if (ratingoption==="ascendente"){
                props.orderbyratings(juegos,ratingoption)
            }else if (ratingoption==="descendente"){
                props.orderbyratings(juegos,ratingoption)
            }
                
        }
        else if (event.target.name==="genre"){
            const generoption = event.target.value
            setGenero(generoption)
            props.orderbygenre(juegos,generoption)
            
        }
        else if (event.target.name==="origen"){
            const origenoption = event.target.value
            props.setOrigen(origenoption)
            if (origenoption === "BDD"){
                dispatch(setallgames(juegosbdd))
            }
            else if (origenoption==="API"){
                dispatch(allgames())
            }
        }
            
    }
    // useEffect(async()=>{
    //     await fetch("http://localhost:3001/genre/")
    //         .then(res=>res.json())
    //         .then(data=>setGenress(data))
    // },[])
    useEffect(()=>{
        dispatch(allgenres())
    },[])
    useEffect(()=>{
        dispatch(gamesbdd())
    },[])

    console.log(juegosbdd)
    return (
        <div class="searchbar">
            <button class="boton-gradiente" onClick={()=>busqueda(name)}>search</button>
            <input name="nombre" value={name} onChange={handlerchange1} class="input-search"/>
            <label class="label">Alfabetic</label>
            <select class ="pestana" onChange={handlerchange} name="alfabetic" value={alfaopt}>
                <option value=""> </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            <label class="label">Ratings</label>
            <select class="pestana" onChange={handlerchange} name="rating" value={ratingopt}>
                <option value=""> </option>
                <option value="ascendente">ascendente</option>
                <option value="descendente">descendente</option>
            </select>
            <label class="label">Genre</label>
            <select class="pestana" onChange={handlerchange} name="genre" value={genero}>
                <option value=""> </option>
                {generos.map((genre)=><option value={genre.genre}>{genre.genre}</option>)}
            </select>

            <select class="pestana" name="origen" onChange={handlerchange} value={props.origen}>
                <option value=" "> </option>
                <option value="API">API</option>
                <option value="BDD">BDD</option>
            </select>
            

        </div>
    )
}

export default Searchbar