import React, { useState } from "react";
import "./Create.css";
import "./View.css";

const CreateActor = () => {
  const [actors, setActors] = useState([
    { id: 1, name: "Leonardo DiCaprio", age: 49, dob: "1974-11-11", movies: "Inception" },
    { id: 2, name: "Scarlett Johansson", age: 39, dob: "1984-11-22", movies: "Lost in Translation" },
    { id: 3, name: "Denzel Washington", age: 69, dob: "1954-12-28", movies: "Training Day" }
  ]);

  /* ---------------- CREATE ---------------- */
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActor = {
      id: actors.length + 1,
      name,
      age: Number(age),
      dob,
      movies: "—"
    };

    setActors(prev => [...prev, newActor]);

    setName("");
    setAge("");
    setDob("");
  };

  /* ---------------- UPDATE ---------------- */
  const [selectedActorID, setSelectedActorID] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateDob, setUpdateDob] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleSelectActor = (e) => {
    const id = Number(e.target.value);
    setSelectedActorID(id);

    const actor = actors.find(a => a.id === id);
    if (actor) {
      setUpdateName(actor.name);
      setUpdateAge(actor.age);
      setUpdateDob(actor.dob);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setActors(prev =>
      prev.map(a =>
        a.id === selectedActorID
          ? { ...a, name: updateName, age: Number(updateAge), dob: updateDob }
          : a
      )
    );

    setUpdateMessage("Actor updated successfully.");
  };

  /* ---------------- DELETE ---------------- */
  const [actorToDelete, setActorToDelete] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleDelete = () => {
    if (!actorToDelete) {
      setDeleteMessage("Please select an actor.");
      return;
    }

    setActors(prev =>
      prev.filter(a => a.id !== Number(actorToDelete))
    );

    setActorToDelete("");
    setDeleteMessage("Actor deleted successfully.");
  };

  /* ---------------- VIEW ---------------- */
  const renderList = () =>
    actors.map(a => (
      <li key={a.id}>
        {a.name} — Age {a.age} — DOB {a.dob} — Movies: {a.movies}
      </li>
    ));

  return (
    <div>
      {/* VIEW */}
      <div className="view-container">
        <h2>Actors:</h2>
        <ul className="view-list">{renderList()}</ul>
      </div>

      {/* CREATE */}
      <div className="create-movie-container">
        <h2>Add New Actor</h2>

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

          <button type="submit">Create Actor</button>
        </form>
      </div>

      {/* UPDATE */}
      <div className="update-container">
        <h2>Update Actor</h2>

        <form onSubmit={handleUpdate}>
          <div>
            <label>Select Actor:</label>
            <select value={selectedActorID} onChange={handleSelectActor} required>
              <option value="">--Select Actor--</option>
              {actors.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
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

          <button type="submit">Update Actor</button>
          {updateMessage && <p>{updateMessage}</p>}
        </form>
      </div>

      {/* DELETE */}
      <div className="delete-container">
        <h2>Delete Actor</h2>

        <select
          value={actorToDelete}
          onChange={(e) => setActorToDelete(e.target.value)}
        >
          <option value="">--Select Actor--</option>
          {actors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <button onClick={handleDelete}>Delete Actor</button>

        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      </div>
    </div>
  );
};

export default CreateActor;
