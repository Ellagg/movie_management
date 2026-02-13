import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Create from "./components/Create";
import View from "./components/View";
import Update from "./components/Update";
import Delete from "./components/Delete";
import "./App.css";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Movie Management</h1>

      <div className="home-buttons">
        <button onClick={() => navigate("/create")}>Add a New Movie</button>
        <button onClick={() => navigate("/view")}>View All Movies</button>
        <button onClick={() => navigate("/update")}>Edit a Movie</button>
        <button onClick={() => navigate("/delete")}>Delete a Movie</button>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </Router>
  );
}
