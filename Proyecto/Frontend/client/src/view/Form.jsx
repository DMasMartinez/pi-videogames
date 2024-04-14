import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pacman from "../utils/pacman.jpg";
import { allgenres } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Validation from "./Validation";
import Validation1 from "./Validation1";
import "../styles/Form.css";

const { v4: uuidv4 } = require("uuid");

const Form = () => {
  const deviceslist = [
    "PC",
    "PS1",
    "PS2",
    "PS3",
    "PS4",
    "PS5",
    "XBOX",
    "XBOX360",
    "XBOXSERIESX",
    "XBOXSERIESS",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allgeneros = useSelector((state) => state.generos);
  const [putgenre, setPutgenre] = useState([]);
  const [plataform, setPlataform] = useState([]);
  const [checkgenres, setCheckgenres] = useState({
    Action: false,
    Indie: false,
    Adventure: false,
    RPG: false,
    Strategy: false,
    Shooter: false,
    Casual: false,
    Simulation: false,
    Puzzle: false,
    Arcade: false,
    Platformer: false,
    Racing: false,
    "Massively Multiplayer": false,
    Sports: false,
    Fighting: false,
    "Board Games": false,
    Family: false,
    Educational: false,
    Card: false,
  });
  const [fecha, setFecha] = useState({
    dia: "",
    mes: "",
    ano: "",
  });
  const [errorfecha, setErrorfecha] = useState({
    dia: "",
    mes: "",
    ano: "",
  });
  function fechasa(day, month, year) {
    const newday = day.toString();
    const newmonth = month.toString();
    const newyear = year.toString();
    return `${day}-${month}-${year}`;
  }

  // const [generos,setGeneros] = useState([])
  const [game, setGame] = useState({
    id: `${uuidv4()}`,
    name: "",
    description: "",
    devices: [],
    release:
      fecha.dia &&
      fecha.mes &&
      fecha.ano &&
      `${fecha.dia}-${fecha.mes}-${fecha.ano}`,
    image: pacman,
    ratings: "",
    Genres: [
      allgeneros.map((genero) => {
        return { genero: false };
      }),
    ],
  });
  const [error, setError] = useState({
    id: "",
    name: "",
    description: "",
    devices: "",
    release: "",
    image: "",
    ratings: "",
    Genres: "",
  });
  function handlerchange(event) {
    if (event.target.name === "name") {
      setGame({ ...game, name: event.target.value });
      setError(Validation({ ...game, name: event.target.value }));
    }
    if (event.target.name === "description") {
      setGame({ ...game, description: event.target.value });
      setError(Validation({ ...game, description: event.target.value }));
    }
    if (event.target.name === "devices") {
      if (event.target.checked === true) {
        setPlataform([...plataform, event.target.value]);
        setGame({ ...game, devices: [...plataform, event.target.value] });
        setError(
          Validation({ ...game, devices: [...plataform, event.target.value] })
        );
      } else {
        setPlataform([
          ...plataform.filter((device) => device != event.target.value),
        ]);
        setGame({
          ...game,
          devices: [
            ...plataform.filter((device) => device != event.target.value),
          ],
        });
        setError(
          Validation({
            ...game,
            devices: [
              ...plataform.filter((device) => device != event.target.value),
            ],
          })
        );
      }
    }
    // if (event.target.name==="release"){
    //     setGame({...game,release:event.target.value})
    //     setError(Validation({...game,release:event.target.value}))
    // }
    ///////////////////////////////////////////////////////////////////
    if (event.target.name === "day") {
      const newday = event.target.value;
      setFecha({ ...fecha, dia: newday });
      setErrorfecha(Validation1({ ...fecha, dia: newday }));
    }
    if (event.target.name === "month") {
      const newmonth = event.target.value;
      setFecha({ ...fecha, mes: newmonth });
      setErrorfecha(Validation1({ ...fecha, mes: newmonth }));
    }
    if (event.target.name === "year") {
      const newyear = event.target.value;
      setFecha({ ...fecha, ano: newyear });
      setGame({ ...game, release: `${fecha.dia}-${fecha.mes}-${newyear}` });
      setErrorfecha(Validation1({ ...fecha, ano: newyear }));
    }
    ////////////////////////////////////////////////////////////////////
    if (event.target.name === "ratings") {
      setGame({ ...game, ratings: event.target.value });

      setError(Validation({ ...game, ratings: event.target.value }));
    }
    // if (event.target.name==="Genres"){
    //     const newgenre = event.target.value
    //     setPutgenre([...putgenre,newgenre])
    //     setGame({...game,Genres:[...putgenre,newgenre]})
    //     Validation(error,setError,{...game,Genres:newgenre})
    // }
    if (event.target.name === "Genres") {
      if (event.target.checked === true) {
        setPutgenre([...putgenre, event.target.value]);
        setGame({ ...game, Genres: [...putgenre, event.target.value] });
      } else {
        setPutgenre([
          ...putgenre.filter((genero) => genero != event.target.value),
        ]);
        setGame({
          ...game,
          Genres: [
            ...putgenre.filter((genero) => genero != event.target.value),
          ],
        });
      }
      setCheckgenres({
        ...checkgenres,
        [event.target.name]: event.target.checked,
      });
    }
  }

  function blankinputgenres() {
    const newobject = {};
    for (const key in checkgenres) {
      newobject[key] = false;
    }
    setCheckgenres(newobject);
  }
  useEffect(() => {
    dispatch(allgenres());
  }, []);
  // useEffect(async()=>{
  //     await fetch("http://localhost:3001/genre/")
  //         .then(res=>res.json())
  //         .then(data=>setGeneros(data))
  // },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newdriver = props.convert(driver)

    try {
      console.log(game);
      const response = await fetch(
        "https://pi-videogames-at22.onrender.com/game/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(game),
        }
      );

      if (response.ok) {
        const nuevoRegistro = await response.json();
        console.log("Registro creado con éxito:", nuevoRegistro);
      } else {
        console.error("Error al crear el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
    setGame({
      name: "",
      description: "",
      devices: [],
      release: "",
      image: pacman,
      ratings: "",
      Genres: setGame({
        ...game,
        Genres: game.Genres.map((genero) => {
          if (e.target.name === genero) {
            e.target.checked = false;
          }
        }),
      }),
    });
    // blankinputgenres()
  };

  return (
    <div class="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="labelform">CREATE A GAME</h2>
        <label class="form-label" htmlFor="name">
          name:{" "}
        </label>
        <input
          class="form-input"
          name="name"
          value={game.name}
          onChange={handlerchange}
        />
        {error.name !== "" && <p className="errores">{error.name}</p>}

        <label class="form-label" htmlFor="description">
          description:
          <textarea
            name="description"
            rows={4}
            cols={40}
            value={game.description}
            onChange={handlerchange}
          />
        </label>

        {/* <input class="form-input" name="description" value={game.description} onChange={handlerchange}/> */}
        {error.description && <p className="errores">{error.description}</p>}

        <label class="form-label" htmlFor="devices">
          devices:
          {deviceslist.map((device, index) => {
            return (
              <div className="checklist2" key={index}>
                <label>
                  <input
                    name="devices"
                    value={device}
                    type="checkbox"
                    onChange={handlerchange}
                  />
                  {device}
                </label>
              </div>
            );
          })}
        </label>

        {/* <label class="form-label" htmlFor="release">release: </label>
                <input class="form-input" name="release" value={game.release} onChange={handlerchange}/>
                {error.release&&<p className="errores">{error.release}</p>} */}
        <div className="fecha">
          <label class="form-label" htmlFor="day">
            day:{" "}
          </label>
          <input
            class="form-input"
            name="day"
            value={fecha.dia}
            onChange={handlerchange}
            cols={10}
          />

          <label class="form-label" htmlFor="month">
            month:{" "}
          </label>
          <input
            class="form-input"
            name="month"
            value={fecha.mes}
            onChange={handlerchange}
            cols={10}
          />

          <label class="form-label" htmlFor="year">
            year:{" "}
          </label>
          <input
            class="form-input"
            name="year"
            value={fecha.ano}
            onChange={handlerchange}
            cols={10}
          />
        </div>
        {errorfecha.dia && <p className="errores">{errorfecha.dia}</p>}
        {errorfecha.mes && <p className="errores">{errorfecha.mes}</p>}
        {errorfecha.ano && <p className="errores">{errorfecha.ano}</p>}
        <label class="form-label-fecha">example: dd-mm-yyyy</label>
        {error.release && <p className="errores">{error.release}</p>}

        <label class="form-label" htmlFor="ratings">
          ratings:{" "}
        </label>
        <input
          class="form-input"
          name="ratings"
          value={game.ratings}
          onChange={handlerchange}
        />
        {error.ratings && <p className="errores">{error.ratings}</p>}

        <label class="form-label" htmlFor="Genres">
          genres:{" "}
        </label>
        {allgeneros.map(({ id, genre }) => {
          return (
            <div className="checklist" key={id}>
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
          );
        })}

        {game.name != "" &&
        game.description != "" &&
        game.release != "" &&
        game.devices != "" &&
        game.ratings != "" &&
        game.Genres != "" &&
        Object.keys(error).length === 0 &&
        Object.keys(errorfecha).length === 0 ? (
          <button class="form-button" type="Submit">
            submit
          </button>
        ) : (
          <button class="form-button-disabled" disabled type="Submit">
            submit
          </button>
        )}
      </form>
    </div>
  );
};
export default Form;
