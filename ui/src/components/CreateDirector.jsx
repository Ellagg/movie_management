import React, { useState } from "react";
import "./Create.css";
import "./View.css";

const CreateDirector = () => {
  const [directors, setDirectors] = useState([
    { id: 1, name: "Abbas Kiarostami", age: 76, dob: "1940-06-22", movies: "Where Is The Friend's House?" },
    { id: 2, name: "Hayao Miyazaki", age: 85, dob: "1941-01-05", movies: "Princess Mononoke" },
    { id: 3, name: "Wes Anderson", age: 56, dob: "1969-05-01", movies: "The Grand Budapest Hotel" }
  ]);

  // CREATE
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");

  // UPDATE
  const [selectedDirectorID, setSelectedDirectorID] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateDob, setUpdateDob] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  // DELETE
  const [directorToDelete, setDirectorToDelete] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  /* ---------------- CREATE ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newDirector = {
      id: directors.length + 1,
      name,
      age: Number(age),
      dob,
      movies: "—"
    };

    setDirectors(prev => [...prev, newDirector]);

    setName("");
    setAge("");
    setDob("");
  };

  /* ---------------- UPDATE ---------------- */
  const handleSelectDirector = (e) => {
    const id = Number(e.target.value);
    setSelectedDirectorID(id);

    const director = directors.find(d => d.id === id);
    if (director) {
      setUpdateName(director.name);
      setUpdateAge(director.age);
      setUpdateDob(director.dob);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setDirectors(prev =>
      prev.map(d =>
        d.id === selectedDirectorID
          ? { ...d, name: updateName, age: Number(updateAge), dob: updateDob }
          : d
      )
    );

    setUpdateMessage("Director updated successfully.");
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = () => {
    if (!directorToDelete) {
      setDeleteMessage("Please select a director.");
      return;
    }

    setDirectors(prev =>
      prev.filter(d => d.id !== Number(directorToDelete))
    );

    setDirectorToDelete("");
    setDeleteMessage("Director deleted successfully.");
  };

  /* ---------------- VIEW ---------------- */
  const renderList = () =>
    directors.map(d => (
      <li key={d.id}>
        {d.name} — Age {d.age} — DOB {d.dob} — Movies: {d.movies}
      </li>
    ));

  return (
    <div>
      {/* VIEW */}
      <div className="view-container">
        <h2>Directors:</h2>
        <ul className="view-list">{renderList()}</ul>
      </div>

      {/* CREATE */}
      <div className="create-movie-container">
        <h2>Add New Director</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div>
            <label>Age:</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
          </div>

          <div>
            <label>Date of Birth:</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
          </div>

          <button type="submit">Create Director</button>
        </form>
      </div>

      {/* UPDATE */}
      <div className="update-container">
        <h2>Update Director</h2>

        <form onSubmit={handleUpdate}>
          <div>
            <label>Select Director:</label>
            <select value={selectedDirectorID} onChange={handleSelectDirector} required>
              <option value="">--Select Director--</option>
              {directors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Name:</label>
            <input value={updateName} onChange={e => setUpdateName(e.target.value)} required />
          </div>

          <div>
            <label>Age:</label>
            <input type="number" value={updateAge} onChange={e => setUpdateAge(e.target.value)} required />
          </div>

          <div>
            <label>Date of Birth:</label>
            <input type="date" value={updateDob} onChange={e => setUpdateDob(e.target.value)} required />
          </div>

          <button type="submit">Update Director</button>
          {updateMessage && <p>{updateMessage}</p>}
        </form>
      </div>

      {/* DELETE */}
      <div className="delete-container">
        <h2>Delete Director</h2>

        <select
          value={directorToDelete}
          onChange={(e) => setDirectorToDelete(e.target.value)}
        >
          <option value="">--Select Director--</option>
          {directors.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <button onClick={handleDelete}>Delete Director</button>

        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      </div>
    </div>
  );
};

export default CreateDirector;
