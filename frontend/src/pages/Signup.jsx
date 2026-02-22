import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure correct import path

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Guest"); // Default to Guest
  const [error, setError] = useState("");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    // ADD 'await' RIGHT HERE 👇
    const result = await register(username, password, role);
    
    if (result.success) {
      navigate("/"); 
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">📝 Sign Up</h1>
        <p className="home-subtitle">Create an account to join video rooms</p>
        
        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Choose a Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="home-input"
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="home-input"
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="home-input"
            required
          />
          
          {/* Role Selection Dropdown */}
          <select 
            className="home-input" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Guest">Guest (Client/Patient)</option>
            <option value="Host">Host (Consultant/Admin)</option>
          </select>

          <button type="submit" className="join-button" style={{ background: "#22c55e", marginBottom: "15px" }}>
            Create Account
          </button>
        </form>

        <p style={{ fontSize: "14px", color: "#666" }}>
          Already have an account? <Link to="/login" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold" }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;