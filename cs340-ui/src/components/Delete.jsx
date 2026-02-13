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

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(mid => mid !== id)
        : [...prev, id]
    );
  };

  const handleDelete = () => {
    setMovies(prev => prev.filter(movie => !selected.includes(movie.id)));
    setSelected([]);
  };

  return (
    <div className="delete-container">
      <h2>Delete Movies</h2>

      <input
        type="text"
        placeholder="Search movies by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="movie-list">
        {filteredMovies.length === 0 && (
          <p className="no-results">No movies found.</p>
        )}

        {filteredMovies.map(movie => (
          <label key={movie.id} className="movie-item">
            <input
              type="checkbox"
              checked={selected.includes(movie.id)}
              onChange={() => toggleSelect(movie.id)}
            />
            {movie.title}
          </label>
        ))}
      </div>

      <button
        className="delete-button"
        disabled={selected.length === 0}
        onClick={handleDelete}
      >
        Delete Selected
      </button>
    </div>
  );
}
