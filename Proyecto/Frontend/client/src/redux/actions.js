import {ALLGAMES,GAMESEARCH,ALLGENRES,GAMESBDD, SETALLGAMES, SETPAGEUP, SETPAGEDOWN,SETPAGE, SETCOUNT} from './action-type'

export const allgames =()=>{
    return async function (dispatch){
        const arrayindex = Array.from({ length: 5 }, (_, index) => index+1)
        const games = arrayindex.map(async(i)=>{
            const res = await fetch(`http://localhost:3001/game/${i}`)
            const data = await res.json()
            return data
        })
        const newgames = games.filter((game)=>!game.error)
        const gamestoshow = await Promise.all(newgames)
        // setGamespag([...gamestoshow.filter((objeto)=>!objeto.error)])
        return dispatch({type:ALLGAMES,payload:[...gamestoshow.filter((objeto)=>!objeto.error)]})
    }
}

export const gamesearch = (name) =>{
    return async function (dispatch){
        // return new Promise(async (resolve, reject) => {
        //     try {
        //       const response = await fetch(`http://localhost:3001/game/?name=${name}`);
        //       const data = await response.json();
        //       const newdata = resolve(data)
        //       dispatch({ type: GAMESEARCH, payload: newdata });
        //     } catch (error) {
        //       reject(error); // Rechaza la promesa si hay un error
        //     }
        //   });
        await fetch(`http://localhost:3001/game/?name=${name}`)
            .then(res=>res.json())
            .then(data=>dispatch({type:GAMESEARCH,payload:data}))
    }
}

export const allgenres = () =>{
    return async function(dispatch){
        fetch(`http://localhost:3001/genre/`)
            .then(res=>res.json())
            .then(data=>dispatch({type:ALLGENRES,payload:data}))
    }
}

export const gamesbdd = () =>{
    // return async function(dispatch){
    //     fetch("http://localhost:3001/game/")
    //         .then(res=>res.json())
    //         .then(data=>dispatch({type:GAMESBDD,payload:[...data.filter((game)=>game.id.length>6)]}))
    // }
    return async function(dispatch){
        const response = await fetch('http://localhost:3001/game/');
        const data = await response.json();
        const newdata = data.filter((data)=>data.id.length>8)

        return dispatch({ type: GAMESBDD, payload: newdata });
    }
    
}

export const setallgames = (listgames) =>{
    return {type:SETALLGAMES,payload:listgames}
}

export const setpageup = (page) =>{
    return {type:SETPAGEUP,payload:page+1}
}
export const setpagedown = (page) =>{
    return {type:SETPAGEDOWN,payload:page-1}
}

export const setpage = (gameid,qt) =>{
    return {type:SETPAGE,payload:Math.ceil(Number(gameid)/qt)}
}

export const setcount = (count)=>{
    return {type:SETCOUNT,payload:count+1}
}