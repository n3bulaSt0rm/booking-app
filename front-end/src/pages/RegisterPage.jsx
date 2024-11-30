import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import React from "react";
import "./register-page.css";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/users/register", {
        firstName,
        lastName,
        email,
        password,
      });
      alert(response.data.message || "Registration successful! Now you can login.");
      setRedirect(true);
    } catch (e) {
      if (e.response && e.response.data) {
        alert(e.response.data.message || "Registration failed. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className="register-page">
      <header className="register-header">
        <Link to={"/"} className="register-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="logo-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
          <span className="logo-text">StayEasy</span>
        </Link>
      </header>
      <main className="register-content">
        <div className="register-box">
          <h1 className="register-title">Register</h1>
          <form className="register-form" onSubmit={registerUser}>
            <label className="form-label">Your name</label>
            <div className="name-fields">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
              />
            </div>
            <label className="form-label">Your email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label className="form-label">Your password</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button type="submit" className="submit-button">Register</button>
            <div className="already-member">
              Already a member?{" "}
              <Link to="/login" className="login-link">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
