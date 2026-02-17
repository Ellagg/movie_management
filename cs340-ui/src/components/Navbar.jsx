import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>

            <NavLink to="/create" className="nav-link">
                Create
            </NavLink>

            <NavLink to="/view" className="nav-link">
                View
            </NavLink>

            <NavLink to="/update" className="nav-link">
                Update
            </NavLink>

            <NavLink to="/delete" className="nav-link">
                Delete
            </NavLink>
        </nav>
    );
}

export default Navbar;