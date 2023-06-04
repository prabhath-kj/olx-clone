import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import { firebaseContext } from "../../utils/FirebaseStore";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./Login.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const { auth } = useContext(firebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage("Please enter valid details");
      });
   
  };

  return (
    <div className="container">
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
          <br />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
          {/* Display error message */}
          <br />
          <button>Login</button>
        </form>
        <Link style={{ color: "black", textDecoration: "none" }} to="/Signup">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
