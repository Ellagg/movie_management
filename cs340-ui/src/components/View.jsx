import React, { useState } from "react";
import "./View.css";

const View = () => {
  const movies = [
    { id: 1, title: "Where Is The Friend's House?", year: 1987 },
    { id: 2, title: "Princess Mononoke", year: 1997 },
    { id: 3, title: "The Grand Budapest Hotel", year: 2014 },
  ];

  const directors = [
    { id: 1, name: "Abbas Kiarostami", age: 76 },
    { id: 2, name: "Hayao Miyazaki", age: 85 },
    { id: 3, name: "Wes Anderson", age: 56 },
  ];

  const actors = [
    { id: 1, name: "Tsunehiko Kamijō", age: 85 },
    { id: 2, name: "Adrien Brody", age: 52 },
    { id: 3, name: "Léa Seydoux", age: 40 },
  ];

  const [selected, setSelected] = useState("movies");

  const renderList = () => {
    switch (selected) {
      case "movies":
        return movies.map((m) => (
          <li key={m.id}>
            {m.title} ({m.year})
          </li>
        ));
      case "directors":
        return directors.map((d) => (
          <li key={d.id}>
            {d.name} — Age {d.age}
          </li>
        ));
      case "actors":
        return actors.map((a) => (
          <li key={a.id}>
            {a.name} — Age {a.age}
          </li>
        ));
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
      </select>

      <ul className="view-list">{renderList()}</ul>
    </div>
  );
};

export default View;
