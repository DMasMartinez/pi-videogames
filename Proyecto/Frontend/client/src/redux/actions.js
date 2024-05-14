import {
  ALLGAMES,
  GAMESEARCH,
  ALLGENRES,
  GAMESBDD,
  SETALLGAMES,
  SETPAGEUP,
  SETPAGEDOWN,
  SETPAGE,
  SETCOUNT,
  SETPAGETOONE,
  SETALLSEARCHGAMES,
} from "./action-type";

export const allgames = () => {
  // print ("hola")
  // return async function (dispatch){
  //     const arrayindex = Array.from({ length: 20 }, (_, index) => index+1)
  //     const games = arrayindex.map(async(i)=>{
  //         const res = await fetch(`http://localhost:3001/game/${i}`)
  //         const data = await res.json()
  //         return data
  //     })
  //     const newgames = games.filter((game)=>!game.error)
  //     const gamestoshow = await Promise.all(newgames)
  //     // setGamespag([...gamestoshow.filter((objeto)=>!objeto.error)])
  //     return dispatch({type:ALLGAMES,payload:[...gamestoshow.filter((objeto)=>!objeto.error)]})
  // }
  return async function (dispatch) {
    let allgames = [];
    let URL = `https://api.rawg.io/api/games?key=f365d38e7dd34a0fa6f6f14135d94e13`;
    const arrayindex = Array.from({ length: 8 }, (_, index) => index + 2);
    const todojuego = arrayindex.map(async (valor) => {
      const games = await fetch(
        `https://api.rawg.io/api/games?key=c58977baa48f48a2b4a0cb43a9436d91&page=${valor}`
      );
      const data = games.json();
      return data;
    });
    const gamestoshow = await Promise.all(todojuego);
    const gamestoshow1 = gamestoshow.map((listgames) => listgames.results);
    const games = gamestoshow1.flat();
    const objectgames = games.map((data) => {
      const newobject = {
        id: data.id.toString(),
        name: data.name,
        devices: data.plataforms?.map((plat) => plat.platform.name),
        release: data.released,
        image: data.background_image,
        ratings: data.rating,
        description: data.description,
        Genres: data.genres.map((genre) => genre.name),
      };
      return newobject;
    });

    return dispatch({ type: ALLGAMES, payload: [...objectgames] });
  };
};

export const gamesearch = (name) => {
  return async function (dispatch) {
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
    await fetch(`https://videogames-v7uq.onrender.com/game/?name=${name}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: GAMESEARCH, payload: data }));
  };
};

export const allgenres = () => {
  return async function (dispatch) {
    fetch(`https://videogames-v7uq.onrender.com/genre/`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: ALLGENRES, payload: data }));
  };
};

export const gamesbdd = () => {
  // return async function(dispatch){
  //     fetch("http://localhost:3001/game/")
  //         .then(res=>res.json())
  //         .then(data=>dispatch({type:GAMESBDD,payload:[...data.filter((game)=>game.id.length>6)]}))
  // }
  return async function (dispatch) {
    const response = await fetch("https://videogames-v7uq.onrender.com/game/");
    const data = await response.json();
    const newdata = data.filter((data) => data.id.length > 8);

    return dispatch({ type: GAMESBDD, payload: newdata });
  };
};

export const setallgames = (listgames) => {
  return { type: SETALLGAMES, payload: listgames };
};

export const setallsearchgames = (gamelist) => {
  return { type: SETALLSEARCHGAMES, payload: gamelist };
};

export const setpageup = (page) => {
  return { type: SETPAGEUP, payload: page + 1 };
};
export const setpagedown = (page) => {
  return { type: SETPAGEDOWN, payload: page - 1 };
};

export const setpage = (newpage) => {
  return { type: SETPAGE, payload: newpage };
};

export const setcount = (count) => {
  return { type: SETCOUNT, payload: count + 1 };
};

export const setpagetoone = () => {
  return { type: SETPAGETOONE, payload: 1 };
};
