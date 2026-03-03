import { useState } from "react";
import "./Delete.css";

export default function Delete() {
  // Mock movie data (temporary, no backend yet)
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
  );
}
