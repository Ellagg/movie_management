import React, { useState, useEffect } from "react";
import "./css/Create.css";
import "./css/View.css";

const CreateActor = () => {
  // ---- config ----
  const baseUrl = "http://classwork.engr.oregonstate.edu:7689/api";

  // ---- read ----
  const [actors, setActors] = useState([]);

  // ---- create ----
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");

  // ---- update ----
  const [selectedActorID, setSelectedActorID] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateDob, setUpdateDob] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  // ---- delete ----
  const [actorToDelete, setActorToDelete] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // ---- read (fetch) ----
  const fetchActors = async () => {
    try {
      const res = await fetch(`${baseUrl}/actors`);
      const data = await res.json();
      setActors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch actors:", err);
    }
  };

  useEffect(() => {
    fetchActors();
  }, []);

  const formatDate = (d) => {
    if (!d) return "N/A";
    const dt = new Date(d);
    return isNaN(dt) ? "N/A" : dt.toLocaleDateString();
  };

  const renderList = () =>
    actors.map((a) => (
      <li key={a.actorID}>
        {a.name} — Age {a.age ?? "N/A"} — DOB {formatDate(a.dob)}
      </li>
    ));

  // ---- create ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/actors/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age: Number(age), dob }),
      });

      if (!res.ok) throw new Error("Failed to create actor");

      setName("");
      setAge("");
      setDob("");

      fetchActors(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to create actor");
    }
  };

  // ---- update ----
  const handleSelectActor = (e) => {
    const id = Number(e.target.value);
    setSelectedActorID(id);

    const actor = actors.find((a) => a.actorID === id);
    if (actor) {
      setUpdateName(actor.name || "");
      setUpdateAge(actor.age ?? "");
      // Normalize to YYYY-MM-DD for the date input
      const dateOnly =
        typeof actor.dob === "string" ? actor.dob.slice(0, 10) : "";
      setUpdateDob(dateOnly);
    } else {
      setUpdateName("");
      setUpdateAge("");
      setUpdateDob("");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedActorID) {
      setUpdateMessage("Please select an actor.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/actors/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actorID: selectedActorID,
          name: updateName,
          age: Number(updateAge),
          dob: updateDob,
        }),
      });

      if (!res.ok) throw new Error("Failed to update actor");

      setUpdateMessage("Actor updated successfully.");
      setSelectedActorID("");
      setUpdateName("");
      setUpdateAge("");
      setUpdateDob("");

      fetchActors();
    } catch (err) {
      console.error(err);
      setUpdateMessage("Failed to update actor.");
    }
  };

  // ---- delete ----
  const handleDelete = async () => {
    if (!actorToDelete) {
      setDeleteMessage("Please select an actor.");
      return;
    }

    try {
      const res = await fetch(
        `${baseUrl}/actors/delete/${actorToDelete}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok) {
        setDeleteMessage(data.error || "Failed to delete actor");
        return;
      }

      setActorToDelete("");
      setDeleteMessage("Actor deleted successfully.");
      fetchActors();
    } catch (err) {
      console.error(err);
      setDeleteMessage("Failed to delete actor.");
    }
  };

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
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
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
            <select
              value={selectedActorID}
              onChange={handleSelectActor}
              required
            >
              <option value="">--Select Actor--</option>
              {actors.map((a) => (
                <option key={a.actorID} value={a.actorID}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Name:</label>
            <input
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Age:</label>
            <input
              type="number"
              value={updateAge}
              onChange={(e) => setUpdateAge(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              value={updateDob}
              onChange={(e) => setUpdateDob(e.target.value)}
              required
            />
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
          {actors.map((a) => (
            <option key={a.actorID} value={a.actorID}>
              {a.name}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleDelete}>
          Delete Actor
        </button>

        {deleteMessage && <p>{deleteMessage}</p>}
      </div>
    </div>
  );
};

export default CreateActor;