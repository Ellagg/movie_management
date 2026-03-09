import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Actors from "./components/Actors";
import Navbar from "./components/Navbar";
import "./App.css";
import ActorMovies from "./components/ActorMovies";
import Directors from "./components/Directors";
import Genres from "./components/Genres";
import Movies from "./components/Movies";
import Search from "./components/View"


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
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/actorMovies" element={<ActorMovies />} />
          <Route path="/search" element={<Search />}/>
        </Routes>
      </Router>
    </>
  );
}
