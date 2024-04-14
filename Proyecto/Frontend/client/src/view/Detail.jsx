import { useEffect, useState } from "react";
import Gamecard1 from "../components/Gamecard1";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setpage, setcount, setallgames } from "../redux/actions";
import "../styles/marcoshowdetail.css";

const Detail = (props) => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [generos, setGeneros] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pagina = useSelector((state) => state.page);
  const qt = useSelector((state) => state.qt);
  const counter = useSelector((state) => state.count);
  const juegoscache = useSelector((state) => state.juegoscache);
  const juegos = useSelector((state) => state.juegos);
  useEffect(() => {
    fetch(`https://pi-videogames-at22.onrender.com/game/${id}`)
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, [id]);
  useEffect(() => {
    fetch(`https://pi-videogames-at22.onrender.com/game/${id}`)
      .then((res) => res.json())
      .then((data) => setGeneros(data.Genres.map((game) => game.genre + " ")));
  }, [id]);
  // function backtocurrentpage(){
  //     // dispatch(setpage(game.id,qt))
  //     // dispatch(setallgames(juegoscache))
  //     const index = juegos.findIndex(juego => juego.name === game.name);
  //     const page = Math.ceil((index + 1) / qt)
  //     navigate('/home')
  //     return dispatch(setpage(page))
  //     // dispatch(setpage(newpage[newpage.length-1]))

  // }
  // console.log(pagina)

  return (
    <div class="container">
      {/* <button className="backbutton" onClick={backtocurrentpage}>
                back
            </button> */}
      <Gamecard1
        id={game.id}
        name={game.name}
        description={game.description}
        image={game.image}
        release={game.release}
        devices={game.devices}
        ratings={game.ratings}
        genres={generos}
      />
    </div>
  );
};

export default Detail;

// genres={generos}
