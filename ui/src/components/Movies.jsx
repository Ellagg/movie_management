import React, { useState, useEffect } from "react";
import "./css/Create.css";
import "./css/View.css";
import "./css/Delete.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);

  /* ---------------- FETCH DATA ---------------- */

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7689/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7689/api/genres");
      const data = await res.json();
      setGenres(data);
    } catch (err) {
      console.error("Failed to fetch genres:", err);
    }
  };

  const fetchDirectors = async () => {
    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7689/api/directors");
      const data = await res.json();
      setDirectors(data);
    } catch (err) {
      console.error("Failed to fetch directors:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchDirectors();
  }, []);


  useEffect(() => {
    if (movies.length > 0) {
      console.log("movies sample:", movies[0]);
    }
  }, [movies]);


  /* ---------------- CREATE ---------------- */

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genreID, setGenreID] = useState("");
  const [directorID, setDirectorID] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://classwork.engr.oregonstate.edu:7689/api/movies/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            releaseDate,
            genreID: Number(genreID),
            directorID: Number(directorID),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to create movie");

      setTitle("");
      setReleaseDate("");
      setGenreID("");
      setDirectorID("");

      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to create movie");
    }
  };

  /* ---------------- UPDATE ---------------- */

  const [movieToUpdate, setMovieToUpdate] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateReleaseDate, setUpdateReleaseDate] = useState("");
  const [updateGenreID, setUpdateGenreID] = useState("");
  const [updateDirectorID, setUpdateDirectorID] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");


  const handleSelectMovie = (e) => {
    const idStr = e.target.value; // keep as string for the UI
    setMovieToUpdate(idStr);

    if (!idStr || idStr === "undefined") {
      setUpdateTitle("");
      setUpdateReleaseDate("");
      setUpdateGenreID("");
      setUpdateDirectorID("");
      return;
    }

    // find accepting both string/number ids
    const id = Number(idStr);
    const movie = movies.find((m) => Number(m.movieID) === id);

    if (movie) {
      setUpdateTitle(movie.title ?? "");
      setUpdateReleaseDate(
        typeof movie.releaseDate === "string"
          ? movie.releaseDate.split("T")[0]
          : movie.releaseDate ?? "" // allow date-only string or empty
      );
      setUpdateGenreID(
        movie.genreID != null ? String(movie.genreID) : ""
      );
      setUpdateDirectorID(
        movie.directorID != null ? String(movie.directorID) : ""
      );
    } else {
      setUpdateTitle("");
      setUpdateReleaseDate("");
      setUpdateGenreID("");
      setUpdateDirectorID("");
    }
  };



  const handleUpdate = async () => {
    if (!movieToUpdate) {
      setUpdateMessage("Please select a movie.");
      return;
    }

    try {
      const res = await fetch(
        "http://classwork.engr.oregonstate.edu:7689/api/movies/update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieID: Number(movieToUpdate),
            title: updateTitle,
            releaseDate: updateReleaseDate,
            genreID: updateGenreID !== "" ? Number(updateGenreID) : null,
            directorID: updateDirectorID !== "" ? Number(updateDirectorID) : null,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update movie");

      setUpdateMessage("Movie updated successfully.");

      // Reset UI state safely as strings
      setMovieToUpdate("");
      setUpdateTitle("");
      setUpdateReleaseDate("");
      setUpdateGenreID("");
      setUpdateDirectorID("");

      fetchMovies(); // refresh the list
    } catch (err) {
      console.error(err);
      setUpdateMessage("Failed to update movie.");
    }
  };


  /* ---------------- DELETE ---------------- */

  // const [movieToDelete, setMovieToDelete] = useState("");
  // const [deleteMessage, setDeleteMessage] = useState("");

  // const handleDelete = async () => {
  //   if (!movieToDelete) {
  //     setDeleteMessage("Please select a movie.");
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://classwork.engr.oregonstate.edu:7689/api/movies/delete/${movieToDelete}`,
  //       {
  //         method: "DELETE"
  //       }
  //     );

  //     if (!res.ok) throw new Error("Failed to delete movie");

  //     setMovieToDelete("");
  //     setDeleteMessage("Movie deleted successfully.");

  //     fetchMovies();

  //   } catch (err) {
  //     console.error(err);
  //     setDeleteMessage("Failed to delete movie.");
  //   }
  // };

  /* ---------------- VIEW ---------------- */

  const renderList = () =>
    movies.map((m) => (
      <tr key={m.movieID}>
        <td>{m.title}</td>
        <td>{new Date(m.releaseDate).toLocaleDateString()}</td>
        <td>{m.genreName}</td>
        <td>{m.directorName}</td>
      </tr>
    ));

  return (
    <div>
      {/* VIEW */}
      <div className="view-container">
        <h2>Movies:</h2>
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Genre</th>
              <th>Director</th>
            </tr>
          </thead>
          <tbody>{renderList()}</tbody>
        </table>
      </div>

      {/* CREATE */}
      <div className="create-movie-container">
        <h2>Add New Movie</h2>

        <form onSubmit={handleCreate}>
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
              {genres.map((g) => (
                <option key={g.genreID} value={g.genreID}>
                  {g.genreName}
                </option>
              ))}
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
                <option key={d.directorID} value={d.directorID}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={{ marginTop: "15px" }}>
            Add Movie
          </button>
        </form>
      </div>

      {/* UPDATE */}
      <div className="create-movie-container">
        <h2>Update Movie</h2>

        <select value={movieToUpdate} onChange={handleSelectMovie}>
          <option value="">--Select Movie--</option>
          {movies.map((m) => (
            <option key={m.movieID} value={String(m.movieID)}>
              {m.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Title"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
        />

        <input
          type="date"
          value={updateReleaseDate}
          onChange={(e) => setUpdateReleaseDate(e.target.value)}
        />

        <select
          value={updateGenreID}
          onChange={(e) => setUpdateGenreID(e.target.value)}
        >
          <option value="">--Select Genre--</option>
          {genres.map((g) => (
            <option key={g.genreID} value={String(g.genreID)}>
              {g.genreName}
            </option>
          ))}
        </select>

        <select
          value={updateDirectorID}
          onChange={(e) => setUpdateDirectorID(e.target.value)}
        >
          <option value="">--Select Director--</option>
          {directors.map((d) => (
            <option key={d.directorID} value={String(d.directorID)}>
              {d.name}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleUpdate}>
          Update Movie
        </button>

        {updateMessage && <p>{updateMessage}</p>}
      </div>

      {/* DELETE
      <div className="create-movie-container">
        <h2>Delete Movie</h2>

        <select
          value={movieToDelete}
          onChange={(e) => setMovieToDelete(e.target.value)}
        >
          <option value="">--Select Movie--</option>
          {movies.map((m) => (
            <option key={m.movieID} value={m.movieID}>
              {m.title}
            </option>
          ))}
        </select>

        <button onClick={handleDelete}>Delete Movie</button>

        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      </div> */}
    </div>
  );
};

export default Movies;
