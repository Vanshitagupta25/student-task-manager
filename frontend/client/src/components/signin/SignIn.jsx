import "./SignIn.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
     email: "", 
     password: "" });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2000/api/v1/login", {
        email: login.email,
        password: login.password,
      });
      localStorage.setItem("userId", res.data.user._id);
      dispatch(authActions.login(res.data.user));
      alert("login successful");
      navigate("/");
    } catch (err) {
      alert("Invalid Email or Password");
      console.log(err);
    }
  };
  return (
    <div className="signin-container">
      {" "}
      <div className="signin-box">
        {" "}
        <h2>Welcome Back</h2>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={login.email}
            onChange={handleChange}
            required
          />{" "}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={login.password}
            onChange={handleChange}
            required
          />{" "}
          <button type="submit">Sign In</button>{" "}
        </form>{" "}
        <p>
          {" "}
          Don't have an account? <a href="/signup">Sign Up</a>{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default SignIn;
