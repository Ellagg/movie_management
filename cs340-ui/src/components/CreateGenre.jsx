import React, { useState } from "react";
import "./Create.css";

const CreateGenre = () => {
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const genreData = {
      genre
    };

    console.log("Submitting genre:", genreData);

    // Reset form
    setGenre("");
  };

  return (
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
  );
};

export default CreateGenre;
