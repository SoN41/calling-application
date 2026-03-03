import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Guest");
  const [error, setError] = useState("");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

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
        <h1 className="home-title">Create Account</h1>
        <p className="home-subtitle">Sign up to join video rooms</p>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="home-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Create a password (min. 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="home-input"
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="home-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Account Role</label>
            <select 
              className="home-input" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Guest">Guest (Client/Patient)</option>
              <option value="Host">Host (Consultant/Admin)</option>
            </select>
          </div>

          <button type="submit" className="join-button">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;