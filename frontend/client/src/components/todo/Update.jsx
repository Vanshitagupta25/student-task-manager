import React, { useState, useEffect } from "react";
import "./Update.css";

const Update = ({ oldTitle, oldBody, update, close }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(oldTitle);
    setBody(oldBody);
  }, [oldTitle, oldBody]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Title:", title);
    console.log("Updated Body:", body);
    update(title, body);
  };

  return (
    <div className="update-box">
      <h2>Update Task</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Enter new title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter new body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <button type="submit" className="btn btn-dark my-4">
          Update
        </button>

        <button type="button" className="btn btn-danger" onClick={close}>
          Close
        </button>
      </form>
    </div>
  );
};

export default Update;
