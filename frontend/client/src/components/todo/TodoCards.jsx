import React from "react";
import "./TodoCards.css";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delId, display }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 my-3">
      <div className="todo-card">
        <div className="todo-card-header">
          <h5 className="todo-title">{title}</h5>

          <div className="icon-group">
            <button
              className="card-icons up"
              onClick={display}  
              type="button"
            >
              <GrDocumentUpdate />
            </button>

            <button
              className="card-icons del"
              onClick={() => delId(id)}
              type="button"
            >
              <MdDelete />
            </button>
          </div>
        </div>

        <p className="todo-body">
          {body.length > 100 ? body.slice(0, 100) + "..." : body}
        </p>
      </div>
    </div>
  );
};

export default TodoCards;
