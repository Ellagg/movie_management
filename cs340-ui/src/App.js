import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Create from "./components/Create";
import View from "./components/View";
import Update from "./components/Update";
import Delete from "./components/Delete";

function Home() {
  return (
    <div>
      <h1>Movie Management</h1>
      <ul>
        <li><Link to="/create">Add a new movie</Link></li>
        <li><Link to="/view">View all movies</Link></li>
        <li><Link to="/update">Edit a movie</Link></li>
        <li><Link to="/delete">Delete a movie</Link></li>
      </ul>
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
