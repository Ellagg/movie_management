import React, { useState, useEffect } from "react";
import "./Create.css";
import "./View.css";

const CreateDirector = () => {
  const [directors, setDirectors] = useState([]);
  
    useEffect(() => {
      const fetchDirectors = async () => {
        try {
          const response = await fetch("http://classwork.engr.oregonstate.edu:7879/api/directors"); // or your deployed backend URL
          const data = await response.json();
          setDirectors(data); // populate state with backend data
        } catch (err) {
          console.error("Failed to fetch directors:", err);
        }
      };
  
      fetchDirectors();
    }, []);
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
        {d.name} — Age {d.age} — DOB {new Date(d.dob).toLocaleDateString()}
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
