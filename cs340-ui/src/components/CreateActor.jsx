import React, { useState } from "react";
import "./Create.css"; 

const CreateActor = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const actorData = {
      name,
      age: Number(age),
      dob
    };

    console.log("Submitting actor:", actorData);

    // Reset form
    setName("");
    setAge("");
    setDob("");
  };

  return (
    <div className="create-movie-container">
      <h2>Add New Actor</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>
          <input
            type="text"
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
  );
};

export default CreateActor;
