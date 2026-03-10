import React, { useState, useEffect } from "react";
import "./css/Create.css";
import "./css/View.css";

const CreateDirector = () => {
  // read
  const [directors, setDirectors] = useState([]);
  // create
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState(""); 
  // update
  const [selectedDirectorID, setSelectedDirectorID] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateDob, setUpdateDob] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  // delete
  const [directorToDelete, setDirectorToDelete] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // read
  const fetchDirectors = async () => {
    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/directors");
      const data = await res.json();
      setDirectors(data);
    } catch (err) {
      console.error("Failed to fetch directors:", err);
    }
  };

  useEffect(() => {
    fetchDirectors();
  }, []);

  const renderList = () =>
    directors.map(d => (
      <li key={d.directorID}>
        {d.name} — Age {d.age ?? "N/A"} — DOB {formatDate(d.dob)}
      </li>
    ));

  // create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/directors/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age: Number(age), dob })
      });

      if (!res.ok) throw new Error("Failed to create director");

      setName("");
      setAge("");
      setDob("");

      fetchDirectors(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to create director");
    }
  };

  // update
  const handleSelectDirector = (e) => {
    const id = Number(e.target.value);
    setSelectedDirectorID(id);

    const director = directors.find(d => d.directorID === id);
    if (director) {
      setUpdateName(director.name);
      setUpdateAge(director.age);
      setUpdateDob(director.dob.slice(0,10));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedDirectorID) {
      setUpdateMessage("Please select a director.");
      return;
    }

    try {
      const res = await fetch("http://classwork.engr.oregonstate.edu:7879/api/directors/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          directorID: selectedDirectorID,
          name: updateName,
          age: Number(updateAge),
          dob: updateDob
        })
      });

      if (!res.ok) throw new Error("Failed to update director");

      setUpdateMessage("Director updated successfully.");
      setSelectedDirectorID("");
      setUpdateName("");
      setUpdateAge("");
      setUpdateDob("");

      fetchDirectors();
    } catch (err) {
      console.error(err);
      setUpdateMessage("Failed to update director.");
    }
  };

  // delete
  const handleDelete = async () => {
    if (!directorToDelete) {
      setDeleteMessage("Please select a director.");
      return;
    }

    try {
      const res = await fetch(
        `http://classwork.engr.oregonstate.edu:7879/api/directors/delete/${directorToDelete}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok) {
        setDeleteMessage(data.error || "Failed to delete director");
        return;
      }

      setDirectorToDelete("");
      setDeleteMessage("Director deleted successfully.");
      fetchDirectors();
    } catch (err) {
      console.error(err);
      setDeleteMessage("Failed to delete director.");
    }
  };

  const formatDate = (dob) => {
    if (!dob) return "N/A";
    const d = new Date(dob);
    return isNaN(d) ? "N/A" : d.toLocaleDateString();
  };

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
                <option key={d.directorID} value={d.directorID}>{d.name}</option>
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
        <select value={directorToDelete} onChange={e => setDirectorToDelete(e.target.value)}>
          <option value="">--Select Director--</option>
          {directors.map(d => (
            <option key={d.directorID} value={d.directorID}>{d.name}</option>
          ))}
        </select>
        <button type="button" onClick={handleDelete}>Delete Director</button>
        {deleteMessage && <p>{deleteMessage}</p>}
      </div>
    </div>
  );
};

export default CreateDirector;
