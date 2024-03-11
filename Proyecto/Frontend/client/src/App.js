import logo from './logo.svg';
import './App.css';
import Landing from './view/Landing';
import Home from './view/Home';
import Form from './view/Form';
import Search from './view/Search';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import Detail from './view/Detail';
import Navbar from './view/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { setallgames } from './redux/actions';

function App() {
  const [games,setGames] = useState([])
  const [gamespag,setGamespag] = useState([])
  const [origen,setOrigen]=useState("API")
  const totalgames = 10
  const location = useLocation()
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const juegos = useSelector(state=>state.juegos)
  const search=async(name)=>{
    const api = await fetch(`http://localhost:3001/game/?name=${name}`)
    const res = await api.json()
    setGames([...games,res])
    // setGames([...games,res])
    navigate('/search')
    console.log(games)
  }
  const showgames = async()=>{

    const arrayindex = Array.from({ length: 100 }, (_, index) => index+1)
    const games = arrayindex.map(async(i)=>{
      const res = await fetch(`http://localhost:3001/game/${i}`)
      const data = await res.json()
      return data
      
    })
    const newgames = games.filter((game)=>!game.error)
    const gamestoshow = await Promise.all(newgames)
    setGamespag([...gamestoshow.filter((objeto)=>!objeto.error)])
    // setGamespag([...gamestoshow])
    
  }
  function orderalfabetic(currentlylist,tipo){
    const newlist = []
    const alfabetic = "abcdefghijklmnopqrstuvwxyz"
    const opositealfabetic = "zyxwvutsrqponmlkjihgfedcba"
    if (tipo === "A-Z"){
      for (var i=0;i<alfabetic.length;i++){
        const currentlyletter = alfabetic[i]
        for (var j=0;j<currentlylist.length;j++){
          if (currentlylist[j].name.toLowerCase()[0]===currentlyletter){
            newlist.push(currentlylist[j])
          }
        }
      }
    }else if (tipo==="Z-A"){
      for (var i=0;i<opositealfabetic.length;i++){
        const currentlyletter = opositealfabetic[i]
        for (var j=0;j<currentlylist.length;j++){
          if (currentlylist[j].name.toLowerCase()[0]===currentlyletter){
            newlist.push(currentlylist[j])
          }
        }
      }
    }
    // setGamespag(newlist)
    dispatch(setallgames(newlist))
  }
  function orderbyratings(currentlylist,tipo){
    const copylist = [...currentlylist]
    let listarating = []

    if (tipo==="ascendente"){
      listarating = copylist.sort((a,b)=>parseFloat(a.ratings)-parseFloat(b.ratings))
    }else if (tipo==="descendente"){
      listarating = copylist.sort((a,b)=>parseFloat(b.ratings)-parseFloat(a.ratings))
    }
    // setGamespag(listarating)
    dispatch(setallgames(listarating))
  }
  function orderbygenre(currentlylist,tipo){
    const lista = []
    let copylist = [...currentlylist]
    const genrelist = currentlylist.map((game)=>game.Genres)
    for (var i=0;i<genrelist.length;i++){
      const currentlist = genrelist[i].map((genre)=>genre.genre)
      if (genrelist[i].map((genre)=>genre.genre).includes(tipo)){
        lista.push(copylist[i])
      }
    }
    // setGamespag(lista)
    dispatch(setallgames(lista))
  }
  
  return (
    <div>
      {location.pathname!=='/'&&<Navbar/>}
      {location.pathname!=='/'&&location.pathname!=='/form'&&location.pathname!=='/search'&&<Searchbar origen = {origen} setOrigen={setOrigen} search={search} orderalfabetic={orderalfabetic} gamespag={gamespag} orderbyratings={orderbyratings} orderbygenre={orderbygenre}/>}
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home gamespag={gamespag} showgames={showgames} totalgames={totalgames}/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/search' element={<Search games={games}/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
