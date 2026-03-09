import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const handleReset = async () => {
        if (!window.confirm("Are you sure you want to reset the database?")) return;

        try {
            const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/reset", {
            method: "POST"
            });
            if (res.ok) {
            alert("Database has been reset!");
            window.location.href = "/"; // optional: reload data after reset
            } else {
            alert("Reset failed");
            }
        } catch (err) {
            console.error(err);
            alert("Reset failed");
        }
    };
    
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

            <NavLink to="/update-actors" className="nav-link">
                Actor Movies
            </NavLink>

            <button
                onClick={handleReset}
                style={{
                marginLeft: "10px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                }}
            >
                RESET
            </button>

            {/* <NavLink to="/delete" className="nav-link">
                Delete Movie
            </NavLink> */}
        </nav>
    );
}

export default Navbar;