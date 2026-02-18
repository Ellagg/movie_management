import React, { useState } from "react";
import "./Create.css";

const Movies = () => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genreID, setGenreID] = useState("");
  const [directorID, setDirectorID] = useState("");

  const [selectedMovieID, setSelectedMovieID] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateReleaseDate, setUpdateReleaseDate] = useState("");
  const [updateGenreID, setUpdateGenreID] = useState("");
  const [updateDirectorID, setUpdateDirectorID] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleSelectMovie = (e) => {
  const movieID = Number(e.target.value);
  setSelectedMovieID(movieID);

  const movie = movies.find(m => m.id === movieID);
    if (movie) {
      setUpdateTitle(movie.title);
      setUpdateReleaseDate(movie.releaseDate || "");
      setUpdateGenreID(movie.genreID || "");
      setUpdateDirectorID(movie.directorID || "");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedMovieID) {
      setUpdateMessage("Please select a movie.");
      return;
    }

    setMovies(prev =>
      prev.map(movie =>
        movie.id === selectedMovieID
          ? {
              ...movie,
              title: updateTitle,
              releaseDate: updateReleaseDate,
              genreID: Number(updateGenreID),
              directorID: Number(updateDirectorID)
            }
          : movie
      )
    );

    setUpdateMessage("Movie updated successfully.");
  };


  const example_movies = [
    { id: 1, title: "Where Is The Friend's House?", year: 1987, genre: "Drama" },
    { id: 2, title: "Princess Mononoke", year: 1997, genre: "Fantasy" },
    { id: 3, title: "The Grand Budapest Hotel", year: 2014, genre: "Drama" },
  ];

  const renderList = () => {
    return example_movies.map((m) => (
      <li key={m.id}>
        {m.title} ({m.year}) — Genre: {m.genre}
      </li>
    ));
  };

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

  const [movies, setMovies] = useState([
    { id: 1, title: "The Matrix" },
    { id: 2, title: "The Godfather" },
    { id: 3, title: "Inception" },
    { id: 4, title: "Interstellar" },
    { id: 5, title: "The Dark Knight" }
  ]);

  const [titleToDelete, setTitleToDelete] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    const trimmedTitle = titleToDelete.trim().toLowerCase();

    if (!trimmedTitle) {
      setMessage("Please enter a movie title.");
      return;
    }

    const exists = movies.some(
      movie => movie.title.toLowerCase() === trimmedTitle
    );

    if (!exists) {
      setMessage("Movie not found.");
      return;
    }

    setMovies(prev =>
      prev.filter(movie => movie.title.toLowerCase() !== trimmedTitle)
    );

    setTitleToDelete("");
    setMessage("Movie deleted successfully.");
  };

  return (
    <div>
    <div className="create-movie-container"s>
      <h2>View, Create, Update, and Delete Movies</h2>
    </div>

    <div className="view-container">
      <h2>Movies:</h2>
      <ul className="view-list">{renderList()}</ul>
    </div>

    <div className="create-movie-container">
      <form onSubmit={handleSubmit}>
        <h2>Add a New Movie</h2>
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

      <div className="update-container">
        <form onSubmit={handleUpdate}>
          <h2>Update a Movie</h2>

          <div>
            <label>Select Movie:</label>
            <select value={selectedMovieID} onChange={handleSelectMovie}>
              <option value="">--Select Movie--</option>
              {movies.map(m => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Title:</label>
            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Release Date:</label>
            <input
              type="date"
              value={updateReleaseDate}
              onChange={(e) => setUpdateReleaseDate(e.target.value)}
            />
          </div>

          <div>
            <label>Genre:</label>
            <select
              value={updateGenreID}
              onChange={(e) => setUpdateGenreID(e.target.value)}
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
              value={updateDirectorID}
              onChange={(e) => setUpdateDirectorID(e.target.value)}
              required
            >
              <option value="">--Select Director--</option>
              {directors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={{ marginTop: "15px" }}>
            Update Movie
          </button>

          {updateMessage && <p>{updateMessage}</p>}
        </form>
      </div>


      <div className="delete-container">
        <h2>Delete a Movie</h2>

        <label>Movie Title</label>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={titleToDelete}
          onChange={(e) => setTitleToDelete(e.target.value)}
        />

        <button onClick={handleDelete}>
          Delete Movie
        </button>

        {message && <p className="delete-message">{message}</p>}
      </div>
    </div>
  );
};

export default Movies;
