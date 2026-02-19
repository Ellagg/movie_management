import React, { useState } from "react";
import "./Create.css";
import "./View.css";

const CreateGenre = () => {
  // Dummy data
  const [genres, setGenres] = useState([
    { id: 1, genre: "Action", movies: ["Mad Max: Fury Road", "John Wick"] },
    { id: 2, genre: "Drama", movies: ["The Shawshank Redemption", "Moonlight"] },
    { id: 3, genre: "Sci-Fi", movies: ["Interstellar", "Blade Runner 2049"] }
  ]);

  /* ---------------- CREATE ---------------- */
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGenre = {
      id: genres.length + 1,
      genre,
      movies: [] // new genres start with no movies
    };

    setGenres(prev => [...prev, newGenre]);
    setGenre("");
  };

  /* ---------------- DELETE ---------------- */
  const [genreToDelete, setGenreToDelete] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleDelete = () => {
    if (!genreToDelete) {
      setDeleteMessage("Please select a genre.");
      return;
    }

    setGenres(prev =>
      prev.filter(g => g.id !== Number(genreToDelete))
    );

    setGenreToDelete("");
    setDeleteMessage("Genre deleted successfully.");
  };

  /* ---------------- VIEW ---------------- */
  const renderList = () =>
    genres.map(g => (
      <li key={g.id}>
        <strong>{g.genre}</strong>
        <br />
        Movies: {g.movies.length > 0 ? g.movies.join(", ") : "—"}
      </li>
    ));

  return (
    <div>
      {/* VIEW */}
      <div className="view-container">
        <h2>Genres:</h2>
        <ul className="view-list">{renderList()}</ul>
      </div>

      {/* CREATE */}
      <div className="create-movie-container">
        <h2>Add New Genre</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Genre Name:</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={{ marginTop: "15px" }}>
            Add Genre
          </button>
        </form>
      </div>

      {/* DELETE */}
      <div className="delete-container">
        <h2>Delete Genre</h2>

        <select
          value={genreToDelete}
          onChange={(e) => setGenreToDelete(e.target.value)}
        >
          <option value="">--Select Genre--</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.genre}</option>
          ))}
        </select>

        <button onClick={handleDelete}>Delete Genre</button>

        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      </div>
    </div>
  );
};

export default CreateGenre;
