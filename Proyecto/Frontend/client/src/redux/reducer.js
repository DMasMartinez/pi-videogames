import {ALLGAMES,GAMESEARCH,ALLGENRES,GAMESBDD,SETALLGAMES,SETPAGEUP, SETPAGEDOWN,SETPAGE,SETCOUNT,SETPAGETOONE} from './action-type'
const initial_state = {
    juegos : [],
    juegosbdd : [],
    generos : [],
    juegosearch : [],
    juegoscache : [],
    page : 1,
    qt : 4,
    count:0

}

const rootReducer = (state=initial_state,{type,payload})=>{
    switch (type){
        case ALLGAMES:
            return {...state,juegos:[...payload],juegoscache:[...payload]}
        case GAMESEARCH:
            return {...state,juegosearch:payload}
            // return {...state,juegosearch:[...state.juegosearch,payload]}
        case ALLGENRES:
            return {...state,generos:payload}
        case GAMESBDD:
            return {...state,juegosbdd:payload}
        case SETALLGAMES:
            return {...state,juegos:payload}
        case SETPAGEUP:
            return {...state,page:payload}
        case SETPAGEDOWN:
            return {...state,page:payload}
        case SETPAGE:
            return {...state,page:payload}
        case SETCOUNT:
            return {...state,count:payload}
        case SETPAGETOONE:
            return {...state,page:payload}
        default:
            return {...state}
    }
}

export default rootReducer;