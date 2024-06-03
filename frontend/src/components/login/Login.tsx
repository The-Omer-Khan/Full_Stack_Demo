import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
    const apiUrl = 'http://localhost:8000';
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch CSRF token from cookies and set it in Axios headers
        const csrfToken = Cookies.get('csrftoken');
        axios.defaults.headers.post['X-CSRFToken'] = csrfToken;
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/login/`, {
                username: inputUsername,
                password: inputPassword
            });
            console.log(response.data); // Handle successful login
            setLoading(false);
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || error.message); // Handle login error
            setErrorMessage(error.response?.data?.error || 'Login failed. Please try again.');
            setShowError(true);
            setLoading(false);
        }
    };

    return (
        <section style={{ alignItems: "center", backgroundColor: "#f0f2f5", display: "flex", height: "100vh", padding: "64px 0px" }}>
            <div style={{ margin: "0 auto", padding: "24px", width: "380px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ marginBottom: "24px" }}>
                    <h1 style={{ marginBottom: "12px", fontSize: "24px" }}>Log in</h1>
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
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
                {showError && <p style={{ color: "red", textAlign: "center", marginBottom: "0px" }}>{errorMessage}</p>}
                <div style={{ marginTop: "12px", textAlign: "center" }}>
                    <p style={{ color: "#5f7381", marginBottom: "0px" }}>Don't have an account?</p>
                    <Link to="/signup" style={{ color: "#1890FF", fontWeight: "bold" }}>Sign up</Link>
                </div>
            </div>
        </section>
    );
}
