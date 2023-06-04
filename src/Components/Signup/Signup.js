import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import { firebaseContext } from "../../utils/FirebaseStore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../utils/FirebaseConfig";
import "./Signup.css";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobnumber, setMobnumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { auth } = useContext(firebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      createUserWithEmailAndPassword(auth, email, password).then(() => {
        updateProfile(auth.currentUser, { displayName: userName }).then(() => {
          addDoc(collection(firestore, "user"), {
            userId: auth.currentUser.uid,
            name: userName,
            mobNumber: mobnumber,
          }).then((docRef) => {
            console.log("document added with", docRef.id);

            navigate("/");
          });
        });
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!userName.trim()) {
      errors.userName = "Username is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!mobnumber.trim()) {
      errors.mobnumber = "Phone number is required";
    } else if (!isValidPhoneNumber(mobnumber)) {
      errors.mobnumber = "Please enter a valid phone number";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation using a regular expression
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div className="container">
      <div className="signupParentDiv">
        <img src={Logo} width="200px" height="200px" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="userName"
            value={userName}
            name="name"
            onChange={({ target }) => {
              setUserName(target.value);
            }}
          />
          {errors.userName && <p style={{ color: "red" }}>{errors.userName}</p>}

          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <br />
          <label htmlFor="mobnumber">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="mobnumber"
            name="phone"
            value={mobnumber}
            onChange={({ target }) => {
              setMobnumber(target.value);
            }}
          />
          {errors.mobnumber && (
            <p style={{ color: "red" }}>{errors.mobnumber}</p>
          )}

          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link style={{ color: "black", textDecoration: "none" }} to="/Login">
          Login
        </Link>
      </div>
    </div>
  );
}
