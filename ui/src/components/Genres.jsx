import React, { useState, useEffect } from "react";
import "./css/Create.css";
import "./css/View.css";
import "./css/Delete.css"

const CreateGenre = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [genreToUpdate, setGenreToUpdate] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [genreToDelete, setGenreToDelete] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  
  // Fetch genres from backend
  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     try {
  //       const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/genres");
  //       const data = await res.json();
  //       setGenres(data);
  //     } catch (err) {
  //       console.error("Failed to fetch genres:", err);
  //     }
  //   };
    
  //   fetchGenres();
  // }, []);

  const fetchGenres = async () => {
    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/genres");
      const data = await res.json();
      setGenres(data);
    } catch (err) {
      console.error("Failed to fetch genres:", err);
    }
  }
  
  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newGenre.trim()) return;

    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/genres/create", 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genreName: newGenre })
        }
      );

      if (!res.ok) throw new Error("Failed to create genre");

      const createdGenre = await res.json();

      // Add the new genre to state so it updates the list
      setGenres(prev => [...prev, createdGenre]);
      setNewGenre(""); // clear input
    } catch (err) {
      console.error(err);
      alert("Failed to create genre");
    }
  };

  const handleUpdate = async () => {
    if (!genreToUpdate || !updatedName.trim()) {
      setUpdateMessage("Please select a genre and enter a new name.");
      return;
    }

    try {
      const res = await fetch(
        "http://classwork.engr.oregonstate.edu:7879/api/genres/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            genreID: Number(genreToUpdate),
            genreName: updatedName
          })
        }
      );

      if (!res.ok) throw new Error("Failed to update genre");

      setUpdateMessage("Genre updated successfully.");
      setGenreToUpdate("");
      setUpdatedName("");

      fetchGenres(); // refresh list

    } catch (err) {
      console.error(err);
      setUpdateMessage("Failed to update genre.");
    }
  };

  const handleDelete = async () => {
    if (!genreToDelete) {
      setDeleteMessage("Please select a genre.");
      return;
    }

    try {
      const res = await fetch(
      `http://classwork.engr.oregonstate.edu:7879/api/genres/delete/${genreToDelete}`,
        {
          method: "DELETE"
        }
      );

      if (!res.ok) throw new Error("Failed to delete genre");

      setGenreToDelete("");
      setDeleteMessage("Genre deleted successfully.");

      fetchGenres(); // refresh list

    } catch (err) {
      console.error(err);
      setDeleteMessage("Failed to delete genre.");
    }
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
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={{ marginTop: "15px" }}>
            Add Genre
          </button>
        </form>
      </div>

      {/* UPDATE */}
      <div className="create-movie-container">
        <h2>Update Genre</h2>

        <select
          value={genreToUpdate}
          onChange={(e) => { 
            const id = e.target.value;
            setGenreToUpdate(id);
            const selectedGenre = genres.find(g => g.genreID == id);
            setUpdatedName(selectedGenre ? selectedGenre.genreName : "");
          }}
        >
          <option value="">--Select Genre--</option>
          {genres.map(g => (
            <option key={g.genreID} value={g.genreID}>
              {g.genreName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Genre Name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />

        <button type="button" onClick={handleUpdate}>Update Genre</button>

        {updateMessage && <p>{updateMessage}</p>}
      </div>

      {/* DELETE */}
      <div className="create-movie-container">
        <h2>Delete Genre</h2>

        <select
          value={genreToDelete}
          onChange={(e) => setGenreToDelete(e.target.value)}
        >
          <option value="">--Select Genre--</option>
          {genres.map(g => (
            <option key={g.genreID} value={g.genreID}>
              {g.genreName}
            </option>
          ))}
        </select>

        <button onClick={handleDelete}>Delete Genre</button>

        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      </div>

    </div>
  );
};

export default CreateGenre;
