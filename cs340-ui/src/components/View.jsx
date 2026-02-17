import React, { useState } from "react";
import "./View.css";

const View = () => {
  const movies = [
    { id: 1, title: "Where Is The Friend's House?", year: 1987, genre: "Drama" },
    { id: 2, title: "Princess Mononoke", year: 1997, genre: "Fantasy" },
    { id: 3, title: "The Grand Budapest Hotel", year: 2014, genre: "Drama" },
  ];

  const directors = [
    { id: 1, name: "Abbas Kiarostami", age: 76, movies: "Where Is The Friend's House?" },
    { id: 2, name: "Hayao Miyazaki", age: 85, movies: "Princess Mononoke" },
    { id: 3, name: "Wes Anderson", age: 56, movies: "The Grand Budapest Hotel" },
  ];

  const actors = [
    { id: 1, name: "Tsunehiko Kamijō", age: 85, movies: "Princess Mononoke" },
    { id: 2, name: "Adrien Brody", age: 52, movies: "The Grand Budapest Hotel" },
    { id: 3, name: "Léa Seydoux", age: 40, movies: "Where Is The Friend's House" },
  ];

  const genres = [
    { id: 1, name: "Drama" },
    { id: 2, name: "Mystery" },
    { id: 3, name: "Fantasy" },
  ];


  const [selected, setSelected] = useState("movies");

  const renderList = () => {
    switch (selected) {
      case "movies":
        return movies.map((m) => (
          <li key={m.id}>
            {m.title} ({m.year}) — Genre: {m.genre}
          </li>
        ));
      case "directors":
        return directors.map((d) => (
          <li key={d.id}>
            {d.name} — Age {d.age} — Movies: {d.movies}
          </li>
        ));
      case "actors":
        return actors.map((a) => (
          <li key={a.id}>
            {a.name} — Age {a.age} — Movies: {a.movies}
          </li>
        ));
      case "genres":
        return genres.map((a) => (
          <li key={a.id}>
            {a.name}
          </li>
        ))
      default:
        return null;
    }
  };

  return (
    <div className="view-container">
      <h2>View Database</h2>

      <label>Choose a category:</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="movies">Movies</option>
        <option value="directors">Directors</option>
        <option value="actors">Actors</option>
        <option value="genres">Genres</option>
      </select>

      <ul className="view-list">{renderList()}</ul>
    </div>
  );
};

export default View;
