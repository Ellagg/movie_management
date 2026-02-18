import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Create from "./components/Create";
import View from "./components/View";
import UpdateActors from "./components/UpdateActors";
import Delete from "./components/Delete";
import Navbar from "./components/Navbar";
import "./App.css";
import CreateActor from "./components/CreateActor";
import CreateDirector from "./components/CreateDirector";
import CreateGenre from "./components/CreateGenre";


function Home() {
  // const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Movie Management</h1>
    </div>
  );
}


export default function App() {
  return (
    <>
      <Router>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create-actor" element={<CreateActor />} />
          <Route path="/create-director" element={<CreateDirector />} />
          <Route path="/create-genre" element={<CreateGenre />} />
          <Route path="/view" element={<View />} />
          <Route path="/update-actors" element={<UpdateActors />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </Router>
    </>
  );
}
