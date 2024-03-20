import "../styles/Pagination.css"
import { useSelector, useDispatch } from "react-redux"
import { setpagedown,setpageup } from "../redux/actions"
const Pagination = (props) => {

    const dispatch = useDispatch()
    const pagina = useSelector(state=>state.page)
    // const juegos = useSelector(state=>state.juegos)
    function nextpage(){

        if (pagina>=Math.ceil(props.juegos.length/props.qt)){
            // setPage(page-1)
            dispatch(setpagedown(pagina))
        }
        // setPage(page+1)
        dispatch(setpageup(pagina))
    }
    function previouspage(){
        if (pagina<=1){
            // setPage(page+1)
            dispatch(setpageup(pagina))
        }
        // setPage(page-1)
        dispatch(setpagedown(pagina))

    }
    console.log(pagina)
    return (
        <div className="framepagination">
            {props.pagina===1?<button disabled className="botonpaginationdisabled" onClick={()=>previouspage()}>previous</button>:<button className="botonpagination" onClick={()=>previouspage()}>previous</button>}
            <label className="pagenumber">Pagina {props.pagina}</label>
            {props.pagina===Math.ceil(props.juegos.length/props.qt)?<button disabled className="botonpaginationdisabled" onClick={()=>nextpage()}>next</button>:<button className="botonpagination" onClick={()=>nextpage()}>next</button>}
        </div>
    )
}

export default Pagination;