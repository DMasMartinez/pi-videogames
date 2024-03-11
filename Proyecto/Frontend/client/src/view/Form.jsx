import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import pacman from '../utils/pacman.jpg'
import { allgenres } from "../redux/actions"
import {useNavigate} from 'react-router-dom'

const {v4:uuidv4} = require('uuid')


const validation=(error,setError,game)=>{
    if (game.name===""){
        setError({...error,name:"the space is blank"})
    }else{
        if (typeof game.name!=="string" && game.name.length<6){
            setError({...error,name:"you filled with the wrong type and length"})
        }
    }
    if (game.description===""){
        setError({...error,description:"the space is already blank"})
    }
    if (game.devices===""){
        setError({...error,devices:"the space is already blank"})
    }
    if (game.release===""){
        setError({...error,release:"the topic still didnt fill"})
    }
    if (game.ratings===""){
        setError({...error,ratings:"the space still blank"})
    }else{
        if (typeof game.ratings==="number"){
            setError({...error,ratings:"the values has the wrong ty"})
        }
    }
    if (game.Genres===""){
        setError({...error,Genres:"the topic still blank"})
    }
}

const Form =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allgeneros = useSelector(state=>state.generos)
    // const [generos,setGeneros] = useState([])
    const [game,setGame]= useState({
        id:`${uuidv4()}`,
        name:"",
        description:"",
        devices:[],
        release:"",
        image:pacman,
        ratings:"",
        Genres:[allgeneros.map((genero)=>{
            return {genero:false}
        })]
        
    })
    const [error,setError] = useState({
        id:"",
        name:"",
        description:"",
        devices:"",
        release:"",
        image:"",
        ratings:"",
        Genres:""
    })
    function handlerchange(event){
        if (event.target.name==="name"){
            setGame({...game,name:event.target.value})
            validation(error,setError,{...game,name:event.target.value})
        }
        if (event.target.name==="description"){
            setGame({...game,description:event.target.value})
            validation(error,setError,{...game,description:event.target.value})
        }
        if (event.target.name==="devices"){
            setGame({...game,devices:[event.target.value]})
            validation(error,setError,{...game,devices:event.target.value})
        }
        if (event.target.name==="release"){
            setGame({...game,release:event.target.value})
            validation(error,setError,{...game,release:event.target.value})
        }
        if (event.target.name==="ratings"){
            setGame({...game,ratings:event.target.value})
            validation(error,setError,{...game,ratings:event.target.value})
        }
        if (event.target.name==="Genres"){
            const newgenre = event.target.value
            setGame({...game,Genres:newgenre})
            validation(error,setError,{...game,Genres:newgenre})
        }
        // if (event.target.name==="Genres"){
        //     const newgenre = event.target.value
        //     // const key = Object.keys(game.Genres).filter((juego)=>juego===newgenre)
        //     // const genrechoice = game.Genres.map((genero)=>O)
        //     // const keys = Object.keys(game.Genres)
        //     setGame({...game,Genres:game.Genres.newgenre===true})
        //     setGame({...game,Genres:[game.Genres.filter((genero)=>genero.newgenre===true)]})
        //     setGame({...game,Genres:Object.keys(game.Genres)})
        //     validation(error,setError,{...game,Genres:[game.Genres.filter((genero)=>genero.newgenre===true)]})
        // }
    }
    useEffect(()=>{
        dispatch(allgenres())
    },[])
    // useEffect(async()=>{
    //     await fetch("http://localhost:3001/genre/")
    //         .then(res=>res.json())
    //         .then(data=>setGeneros(data))
    // },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const newdriver = props.convert(driver)
        try {
            console.log(game)
          const response = await fetch('http://localhost:3001/game/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
          });
    
          if (response.ok) {
            const nuevoRegistro = await response.json();
            console.log('Registro creado con éxito:', nuevoRegistro);
          } else {
            console.error('Error al crear el registro:', response.statusText);
          }
        } catch (error) {
          console.error('Error al enviar la solicitud:', error);
        }
    };
    function backtohome(){
        navigate('/home')
    }
    return (
        <div>
            <button onClick={backtohome}>
                back
            </button>
            <form onSubmit={handleSubmit}>
                <h2>Form</h2>
                <label htmlFor="name">name: </label>
                <input name="name" value={game.name} onChange={handlerchange}/>
                {error.name!==""&&<p>{error.name}</p>}

                <label htmlFor="description">description: </label>
                <input name="description" value={game.description} onChange={handlerchange}/>
                {error.description!==""&&<p>{error.description}</p>}

                <label htmlFor="devices">devices: </label>
                <input name="devices" value={game.devices} onChange={handlerchange}/>
                {error.devices!==""&&<p>{error.devices}</p>}

                <label htmlFor="release">release: </label>
                <input name="release" value={game.release} onChange={handlerchange}/>
                {error.release!==""&&<p>{error.release}</p>}

                <label htmlFor="ratings">ratings: </label>
                <input name="ratings" value={game.ratings} onChange={handlerchange}/>
                {error.ratings!==""&&<p>{error.ratings}</p>}


                <label htmlFor="Genres">genres: </label>
                <select name="Genres" value={game.Genres} onChange={handlerchange}>
                    {allgeneros.map((genero)=>{
                        return <option value={genero.genre}>{genero.genre}</option>
                    })}
                </select>
                {error.Genres!==""&&<p>{error.Genres}</p>}
            
                <button type="Submit">submit</button>
            </form>
        </div>
    )
}

export default Form

// {generos.map((genre)=><option value={genre.genre}>{genre.genre}</option>)}

// Genres:{
//     "Action":false,
//     "Indie":false,
//     "Adventure":false,
//     "RPG":false,
//     "Strategy":false,
//     "Shooter":false,
//     "Casual":false,
//     "Simulation":false,
//     "Puzzle":false,
//     "Arcade":false,
//     "Platformer":false,
//     "Racing":false,
//     "Massively Multiplayer":false,
//     "Sports":false,
//     "Fighting":false,
//     "Board Games":false,
//     "Family":false,
//     "Educational":false,
//     "Card":false
// }