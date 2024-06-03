// src/Signup.js
import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
    const apiUrl = 'http://localhost:8000';
    const [inputUsername, setInputUsername] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/signup/`, {
                username: inputUsername,
                email: inputEmail,
                password: inputPassword
            });
            console.log(response.data); // Handle successful signup
            setLoading(false);
        } catch (error) {
            console.error('Signup failed:', error.response?.data?.error || error.message); // Handle signup error
            setErrorMessage(error.response?.data?.error || 'Signup failed. Please try again.');
            setShowError(true);
            setLoading(false);
        }
    };

    return (
      <section style={{ alignItems: "center", backgroundColor: "#f0f2f5", display: "flex", height: "100vh", padding: "64px 0px" }}>
          <div style={{ margin: "0 auto", padding: "24px", width: "380px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
              <div style={{ marginBottom: "24px" }}>
                  <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginBottom: "24px" }}
                  >
                      <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
                      <path
                          d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
                          fill="white"
                      />
                      <path
                          d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
                          fill="white"
                      />
                      <path
                          d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
                          fill="white"
                      />
                  </svg>

                  <h1 style={{ marginBottom: "12px", fontSize: "24px" }}>Sign up</h1>
                  <p style={{ color: "#5f7381" }}>
                      Welcome to AntBlocks UI! Please enter your details below to sign up.
                  </p>
              </div>
              <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
                  <input
                      type="text"
                      value={inputUsername}
                      onChange={(e) => setInputUsername(e.target.value)}
                      placeholder="Username"
                      aria-label="Username"
                      style={{ marginBottom: "12px", padding: "12px", width: "100%", borderRadius: "4px", border: "1px solid #d9d9d9" }}
                      required
                  />
                  <input
                      type="email"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      placeholder="Email"
                      aria-label="Email"
                      style={{ marginBottom: "12px", padding: "12px", width: "100%", borderRadius: "4px", border: "1px solid #d9d9d9" }}
                      required
                  />
                  <input
                      type="password"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      placeholder="Password"
                      aria-label="Password"
                      style={{ marginBottom: "12px", padding: "12px", width: "100%", borderRadius: "4px", border: "1px solid #d9d9d9" }}
                      required
                  />
                  <button
                      type="submit"
                      disabled={loading}
                      style={{ padding: "12px", width: "100%", borderRadius: "4px", border: "none", backgroundColor: "#1890FF", color: "white", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}
                  >
                      {loading ? 'Signing up...' : 'Sign up'}
                  </button>
              </form>
              {showError && <p style={{ color: "red", textAlign: "center", marginBottom: "0px" }}>{errorMessage}</p>}
              <div style={{ marginTop: "12px", textAlign: "center" }}>
                  <p style={{ color: "#5f7381", marginBottom: "0px" }}>Already have an account?</p>
                  <Link to="/login" style={{ color: "#1890FF", fontWeight: "bold" }}>Log in</Link>
              </div>
          </div>
      </section>
  );
}
