import React, { useState } from 'react'
import "./Todo.css"
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import Update from './Update';
import { useEffect } from "react";


const Todo = () => {
  const [Input, setInput] = useState({ title: "", body: "" }); 
  const [Array, setArray] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const userId = localStorage.getItem("userId");


  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  const getTasks = async() => {
    if(!userId) return;

    try {
      const res = await fetch(`http://localhost:2000/api/v2/getTasks/${userId}`);

      const data = await res.json();
      console.log("Tasks from backend", data.getTasks);

      setArray(data.getTasks || []);

    } catch (err) {
      console.log("Error fetching", err);
    }
  }
  const submit = async() => {
    if(!userId){
      toast.error("Please SignIn first");
      return;
    }
    if (!Input.title.trim() || !Input.body.trim()) return;
    try {
      await fetch(`http://localhost:2000/api/v2/addTask/${userId}`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          title: Input.title,
          body: Input.body,
        }),
      })
  
     setInput({ title: "", body: "" });
     toast("Task Added");

     getTasks();
    } catch (err) {
      console.log("Add task err", err);
    }
  };

  const del = async(taskId) => {
    try {
      await fetch(`http://localhost:2000/api/v2/deleteTask/${taskId}`,
        {method: "DELETE"}
      );
      setArray(Array.filter((task) => task._id != taskId));
      toast.success("Task Deleted");
    } catch(err) {
      console.log(err);
      toast.error("Delete failed");
    }
  }

  const Up = (taskId) => {
    console.log("update", taskId);
    setSelectedTask(taskId);
    document.getElementById("todo-update").style.display = "block";
  }

  const closeUpdate = () => {
    document.getElementById("todo-update").style.display = "none";
    setSelectedTask(null);
  }

  const updateTask = async(title, body) => {
    try {
      const res = await fetch(`http://localhost:2000/api/v2/updateTask/${selectedTask}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ title, body }),
      });
      if(!res.ok) throw new Error("Update failed");

      toast.success("Task Updated");
      closeUpdate();
      getTasks();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };
  useEffect(() => {
    getTasks();
  }, [userId]);


  return (
    <>
      <div className='todo'>
        <ToastContainer />
        <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>

          <div className='d-flex flex-column todo-inputs todo-input-box'>
            <input
              type="text"
              placeholder='TITLE'
              className='my-2 p-2'
              name="title"
              value={Input.title}
              onChange={change}
            />

            <input
              type="text"
              placeholder='BODY'
              name="body"
              className="my-2 p-2"
              value={Input.body}
              onChange={change}
            />
            
            <button className='home-btn add-btn' onClick={submit}>
              Add
            </button>
          </div>
        </div>
        

        <div className="todo-body mt-4">
          <div className='container-fluid'>
            <div className='row'>
              {Array.length === 0 ? (
                <div className='text-center w-100 mt-5'>
                  <h5 className='empty-state'> 
                    No tasks yet. Add one to get started!</h5>
                    </div>
              ) : (
              Array.map((item) => (
                <TodoCards
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  body={item.body}
                  delId={del}
                  display={() => Up(item._id)}
                />
              ))
            )}
            </div>
          </div>
        </div>
      </div>

      <div className='todo-update' id='todo-update'>
        <div className='container'>
          {selectedTask && (
            (() => {
              const taskToEdit = Array.find(task => task._id === selectedTask);
              if(!taskToEdit) return null;
               
              return (
                 <Update 
                   oldTitle={taskToEdit.title}
                   oldBody={taskToEdit.body}
                   update={updateTask}
                   close={closeUpdate}
                 />
                );
             })()
           )}
        </div>
      </div>
    </>
  );
};

export default Todo;
