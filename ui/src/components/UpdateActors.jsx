import React, { useState, useEffect } from "react";
import "./UpdateActors.css";

const UpdateActors = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/actorsMovies");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        console.log("Fetched movies:", data);
        setMovies(data);
      } catch (err) {
        console.error("Failed to fetch movies with actors:", err);
      }
    };
    fetchMovies();
  }, []);

  // const renderList = () =>
  // movies.map((m) => (
  //   <li key={m.movieID}>
  //     <strong>{m.movieTitle}</strong>
  //     <br />
  //     Actors: {m.actors || "—"}
  //   </li>
  // ));

  // Dummy data
  const actors = [
    { id: 1, name: "Tsunehiko Kamijō" },
    { id: 2, name: "Adrien Brody" },
    { id: 3, name: "Léa Seydoux" },
  ];

  // Dummy M:M relationships
  const initialActorMovies = {
    1: [1, 2], // Tsunehiko Kamijō
    2: [3],    // Adrien Brody
    3: [2, 3], // Léa Seydoux
  };

  const [selectedActor, setSelectedActor] = useState(1);
  const [actorMovies, setActorMovies] = useState(initialActorMovies);

  const toggleMovie = (movieId) => {
    setActorMovies((prev) => {
      const current = prev[selectedActor] || [];
      const updated = current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId];

      return { ...prev, [selectedActor]: updated };
    });
  };

  return (
    <div>
      <div className="update-container">
        <h2>Movies and Actors</h2>
        <ul>
          {movies.map((m) => (
            <li key={m.movieID}>
              <strong>{m.movieTitle}</strong> 
              <br />
              Actors: {m.actors || "—"}
            </li>
          ))}
        </ul>
      </div>
      <div className="update-container">
        <h2>Update the movies an actor has been in</h2>

        {/* Actor Dropdown */}
        <label>Select Actor:</label>
        <select
          value={selectedActor}
          onChange={(e) => setSelectedActor(Number(e.target.value))}
        >
          {actors.map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.name}
            </option>
          ))}
        </select>

        <h3>Movies</h3>
        <div className="movie-checkbox-list">
          {movies.map((movie) => (
            <label key={movie.id} className="movie-checkbox-item">
              <input
                type="checkbox"
                checked={actorMovies[selectedActor]?.includes(movie.id)}
                onChange={() => toggleMovie(movie.id)}
              />
              {movie.title}
            </label>
          ))}
        </div>

        <button className="update-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default UpdateActors;
