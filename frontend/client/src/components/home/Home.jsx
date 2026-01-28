import React from 'react'
import "./home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleTodo = () => {
    const userId = localStorage.getItem("userId");
    if(!userId){
      navigate("/signup");
    } else {
      navigate("/todo");
    }
  };

  return (
   <div className='home d-flex justify-content-center align-items-center'>
    <div className='home d-flex justify-content-center align-items-center flex-column'>
      <h1 className='text-center'>
        Organize your <br /> work and life, finally.
      </h1>
      <p>Become focused, organized, and calm with <br />
      todo app. The World's #1 task manager app.</p>
      
       <button className='home-btn p-2'
       onClick={handleTodo}>
        Make Todo List
       </button>
       
    </div>
   </div>
  )
}

export default Home;
