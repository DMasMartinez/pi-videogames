import { Link } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () =>{
    return (
        <nav className="navbar">
            <Link to="/">
                <span className="landing">Landing</span>
            </Link>
            <div className="lista">
                <Link to="/home">
                    <span className="home">Home</span>
                </Link>
                <Link to="Form">
                    <span className="form">Form</span>
                </Link>
            </div>
            {/* <a className="landing" href="/">
                Landing
            </a>
            </div>
            <div class="lista">
                <div class="home">
                    <a href="/home">Home</a>
                </div>
                <div class="form">
                    <a href="/form">Form</a>
                </div>
            </div> */}
        </nav>
    )
}

export default Navbar;