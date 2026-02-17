import React, { useState } from "react";
import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genreID, setGenreID] = useState("");
  const [directorID, setDirectorID] = useState("");

  // Hard-coded dummy directors
  const directors = [
    { id: 1, name: "Christopher Nolan" },
    { id: 2, name: "Quentin Tarantino" },
    { id: 3, name: "Greta Gerwig" },
    { id: 4, name: "Martin Scorsese" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = {
      title,
      releaseDate,
      genreID: Number(genreID),
      directorID: Number(directorID)
    };

    console.log("Submitting movie:", movieData);

    // Reset form
    setTitle("");
    setReleaseDate("");
    setGenreID("");
    setDirectorID("");
  };

  return (
    <div className="create-movie-container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Release Date:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Genre:</label>
          <select
            value={genreID}
            onChange={(e) => setGenreID(e.target.value)}
            required
          >
            <option value="">--Select Genre--</option>
            <option value="1">Action</option>
            <option value="2">Drama</option>
            <option value="3">Comedy</option>
          </select>
        </div>

        <div>
          <label>Director:</label>
          <select
            value={directorID}
            onChange={(e) => setDirectorID(e.target.value)}
            required
          >
            <option value="">--Select Director--</option>
            {directors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Create Movie
        </button>

      </form>
    </div>
  );
};

export default Create;
