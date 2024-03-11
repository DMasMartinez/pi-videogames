import { Link } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () =>{
    return (
        <nav className="navbar">
            <a className="landing" href="/">
                Landing
            </a>
            <div class="lista">
                <div class="home">
                    <a href="/home">Home</a>
                </div>
                <div class="form">
                    <a href="/form">Form</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;