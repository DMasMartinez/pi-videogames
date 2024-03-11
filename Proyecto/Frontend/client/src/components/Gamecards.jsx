import Gamecard from "./Gamecard"
const Gamecards = (props) => {
    return (
        <Gamecard
            id={props.id}
            name={props.name}
            description={props.description}
            release={props.release}
        />
    )
}

export default Gamecards