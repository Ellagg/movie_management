import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>

            <NavLink to="/create" className="nav-link">
                Create Movie
            </NavLink>

            <NavLink to="/create-actor" className="nav-link">
                Create Actor
            </NavLink>

            <NavLink to="/view" className="nav-link">
                View by Category
            </NavLink>

            <NavLink to="/update-actors" className="nav-link">
                Update Actors
            </NavLink>

            <NavLink to="/delete" className="nav-link">
                Delete Movie
            </NavLink>
        </nav>
    );
}

export default Navbar;