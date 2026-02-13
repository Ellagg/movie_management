import React, { useState } from "react";
import "./Create.css"

const Create = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [actors, setActors] = useState([""]);

  // Handle actor input change
  const handleActorChange = (index, value) => {
    const newActors = [...actors];
    newActors[index] = value;
    setActors(newActors);
  };

  // Add a new actor input
  const addActor = () => {
    setActors([...actors, ""]);
  };

  // Remove an actor input
  const removeActor = (index) => {
    const newActors = actors.filter((_, i) => i !== index);
    setActors(newActors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the movie data
    console.log({
      title,
      director,
      genre,
      actors: actors.filter((actor) => actor.trim() !== "")
    });

    // Clear form after submit
    setTitle("");
    setDirector("");
    setGenre("");
    setActors([""]);
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
          <label>Director:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Genre:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">--Select Genre--</option>
            <option value="1">Genre 1</option>
            <option value="2">Genre 2</option>
            <option value="3">Genre 3</option>
          </select>
        </div>

        <div>
          <label>Actors:</label>
          {actors.map((actor, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
              <input
                type="text"
                value={actor}
                onChange={(e) => handleActorChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeActor(index)}
                style={{ marginLeft: "5px" }}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addActor}>
            Add Actor
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button type="submit">Create Movie</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
