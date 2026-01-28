import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2000/api/v1/register", {
        email: user.email,
        username: user.username,
        password: user.password
      });

      

      if (res.data.message === "User already exists") {
        alert(res.data.message);
      } else {
        alert("Registered Successfully");
        window.location.href = "/signin";
      }
    } catch (err) {
      console.log(err);
      alert("Signup failed. Please try again.");
    }
  }; 

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={user.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account?{" "}
          <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
