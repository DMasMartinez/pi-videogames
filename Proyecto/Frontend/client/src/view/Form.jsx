import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import pacman from '../utils/pacman.jpg'
import { allgenres } from "../redux/actions"
import {useNavigate} from 'react-router-dom'
import Validation from "./Validation"
import "../styles/Form.css"

const {v4:uuidv4} = require('uuid')


// const validation=(error,setError,game)=>{
//     if (typeof game.name!="string"){
//         setError({...error,name:"the data is wrong"})
//     }else{
//         if (typeof game.name!=="string" && game.name.length<6){
//             setError({...error,name:"you filled with the wrong type and length"})
//         }
//     }
//     if (game.description===""){
//         setError({...error,description:"the space is already blank"})
//     }
//     if (game.devices===""){
//         setError({...error,devices:"the space is already blank"})
//     }
//     if (game.release===""){
//         setError({...error,release:"the topic still didnt fill"})
//     }
//     if (game.ratings===""){
//         setError({...error,ratings:"the space still blank"})
//     }else{
//         if (typeof game.ratings==="number"){
//             setError({...error,ratings:"the values has the wrong ty"})
//         }
//     }
//     if (game.Genres===""){
//         setError({...error,Genres:"the topic still blank"})
//     }
// }

const Form =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allgeneros = useSelector(state=>state.generos)
    const [putgenre,setPutgenre]=useState([])
    const [checkgenres,setCheckgenres] = useState({
            "Action":false,
            "Indie":false,
            "Adventure":false,
            "RPG":false,
            "Strategy":false,
            "Shooter":false,
            "Casual":false,
            "Simulation":false,
            "Puzzle":false,
            "Arcade":false,
            "Platformer":false,
            "Racing":false,
            "Massively Multiplayer":false,
            "Sports":false,
            "Fighting":false,
            "Board Games":false,
            "Family":false,
            "Educational":false,
            "Card":false

    })
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
            setError(Validation({...game,name:event.target.value}))
        }
        if (event.target.name==="description"){
            setGame({...game,description:event.target.value})
            setError(Validation({...game,description:event.target.value}))
        }
        if (event.target.name==="devices"){
            setGame({...game,devices:[event.target.value]})
            setError(Validation({...game,devices:[event.target.value]}))
        }
        if (event.target.name==="release"){
            setGame({...game,release:event.target.value})
            setError(Validation({...game,release:event.target.value}))
        }
        if (event.target.name==="ratings"){
            setGame({...game,ratings:event.target.value})
            setError(Validation({...game,ratings:event.target.value}))
        }
        // if (event.target.name==="Genres"){
        //     const newgenre = event.target.value
        //     setPutgenre([...putgenre,newgenre])
        //     setGame({...game,Genres:[...putgenre,newgenre]})
        //     Validation(error,setError,{...game,Genres:newgenre})
        // }
        if (event.target.name==="Genres"){
            if (event.target.checked===true){
                setPutgenre([...putgenre,event.target.value])
                setGame({...game,Genres:[...putgenre,event.target.value]})
            }else{
                setPutgenre([...putgenre.filter((genero)=>genero!=event.target.value)])
                setGame({...game,Genres:[...putgenre.filter((genero)=>genero!=event.target.value)]})
            }
            setCheckgenres({...checkgenres,[event.target.name]:event.target.checked})
        }   
    }

    function blankinputgenres(){
        const newobject = {}
        for (const key in checkgenres){
            newobject[key]=false
        }
        setCheckgenres(newobject)
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
        setGame({
            name:"",
            description:"",
            devices:[],
            release:"",
            image:pacman,
            ratings:"",
            Genres:setGame({...game,Genres:game.Genres.map((genero)=>{
                if (e.target.name === genero){
                    e.target.checked = false
                }
            })})
        })
        // blankinputgenres()
    };
    function backtohome(){
        navigate('/home')
    }
    console.log(error)
    return (
        <div class="form-container">
            <button onClick={backtohome}>
                back
            </button>
            <form onSubmit={handleSubmit}>
                <h2>Form</h2>
                <label class="form-label" htmlFor="name">name: </label>
                <input class="form-input" name="name" value={game.name} onChange={handlerchange}/>
                {error.name!==""&&<p className="errores">{error.name}</p>}

                <label class="form-label" htmlFor="description">description: </label>
                <input class="form-input" name="description" value={game.description} onChange={handlerchange}/>
                {error.description&&<p className="errores">{error.description}</p>}

                <label class="form-label" htmlFor="devices">devices: </label>
                <input class="form-input" name="devices" value={game.devices} onChange={handlerchange}/>
                {error.devices&&<p className="errores">{error.devices}</p>}

                <label class="form-label" htmlFor="release">release: </label>
                <input class="form-input" name="release" value={game.release} onChange={handlerchange}/>
                {error.release&&<p className="errores">{error.release}</p>}

                <label class="form-label" htmlFor="ratings">ratings: </label>
                <input class="form-input" name="ratings" value={game.ratings} onChange={handlerchange}/>
                {error.ratings&&<p className="errores">{error.ratings}</p>}

                <label class="form-label" htmlFor="Genres">genres: </label>
                {allgeneros.map(({id,genre})=>{
                    return (
                        <div className = "checklist" key={id}>
                            <label>
                                <input
                                    name="Genres"
                                    type="checkbox"
                                    value={genre}
                                    onChange={handlerchange}
                                    checked={checkgenres.genre}
                                />
                                {genre}
                            </label>
                        </div>
                    )
                })}
            
                <button class="form-button" type="Submit">submit</button>
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

{/* <label class="form-label" htmlFor="Genres">genres: </label>
                <select name="Genres" value={game.Genres[game.Genres.length-1]} onChange={handlerchange}>
                    {allgeneros.map((genero)=>{
                        return <option value={genero.genre}>{genero.genre}</option>
                    })}
                </select>
                {putgenre.map((genero)=>{
                        return <span value={genero}>{genero}</span>
                    })}
                {error.Genres!==""&&<p>{error.Genres}</p>} */}