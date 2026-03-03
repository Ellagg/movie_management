import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>

            <NavLink to="/movies" className="nav-link">
                Movies
            </NavLink>

            <NavLink to="/create-actor" className="nav-link">
                Actors
            </NavLink>

            <NavLink to="/create-director" className="nav-link">
                Directors
            </NavLink>

            <NavLink to="/create-genre" className="nav-link">
                Genres
            </NavLink>

            <NavLink to="/view" className="nav-link">
                View by Category
            </NavLink>

            <NavLink to="/update-actors" className="nav-link">
                Update Actors
            </NavLink>

            {/* <NavLink to="/delete" className="nav-link">
                Delete Movie
            </NavLink> */}
        </nav>
    );
}

export default Navbar;