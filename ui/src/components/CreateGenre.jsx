import React, { useState, useEffect } from "react";
import "./Create.css";
import "./View.css";

const CreateGenre = () => {
  const [genre, setGenre] = useState([]);
  /* ---------------- CREATE ---------------- */
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");

  // Fetch genres from backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/genres");
        const data = await res.json();
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newGenre.trim()) return;

    const genreToAdd = {
      genreID: genres.length + 1,
      genreName: newGenre,
      totalMovies: 0
    };

    setGenres(prev => [...prev, genreToAdd]);
    setNewGenre("");
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
      prev.filter(g => g.genreID !== Number(genreToDelete))
    );

    setGenreToDelete("");
    setDeleteMessage("Genre deleted successfully.");
  };

  /* ---------------- VIEW ---------------- */
  const renderList = () =>
    genres.map(g => (
      <li key={g.genreID}>
        <strong>{g.genreName}</strong> — Movies: {g.totalMovies}
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
