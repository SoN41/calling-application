import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Add Link here
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // 1. Add 'async' here
  const handleLogin = async (e) => { 
    e.preventDefault();
    
    // 2. Add 'await' here so React waits for the database to verify the user
    const result = await login(username, password); 
    
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">🔒 Login</h1>
        <p className="home-subtitle">Sign in to access video rooms</p>
        
        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="home-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="home-input"
            required
          />
          <button type="submit" className="join-button" style={{ marginBottom: "15px" }}>
            Sign In
          </button>
        </form>

        {/* Added Link to Signup Page */}
        <p style={{ fontSize: "14px", color: "#666" }}>
          Don't have an account? <Link to="/signup" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;