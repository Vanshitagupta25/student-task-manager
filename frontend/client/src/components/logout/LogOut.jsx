import React, { useEffect } from "react";
import "./Logout.css";

const Logout = () => {

  useEffect(() => {
    console.log("User logged out");
    // remove token here if you are using auth
    // localStorage.removeItem("token");
  }, []);

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h2>You have been logged out</h2>
        <a className="logout-btn" href="/signin">Go to Sign In</a>
      </div>
    </div>
  );
};

export default Logout;
