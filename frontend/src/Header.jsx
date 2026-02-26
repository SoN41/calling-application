import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import logo from "../assets/logo.png"; 

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-container">
        
        {/* Brand Area */}
        <Link to="/" className="header-brand">
          <img src={logo} alt="VibeCall Logo" className="header-logo" />
        </Link>
        
        {/* Navigation / Menu Items */}
        <nav className="header-nav">
          
          {/* WHAT LOGGED-IN USERS SEE */}
          {user ? (
            <>
              {/* Links for Everyone Logged In */}
              <NavLink to="/" className="header-link">Dashboard</NavLink>
              
              {/* Links ONLY for Hosts */}
              {user.role === "Host" && (
                <NavLink to="/history" className="header-link">Meeting History</NavLink>
              )}
              
              <NavLink to="/profile" className="header-link">Profile</NavLink>

              <div className="header-divider"></div> {/* A small vertical line to separate menu from profile */}

              <span className="header-welcome">Hi, {user.username}</span>
              <button onClick={handleLogout} className="header-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            
            /* WHAT LOGGED-OUT VISITORS SEE */
            <>
              <NavLink to="/features" className="header-link">Features</NavLink>
              <NavLink to="/pricing" className="header-link">Pricing</NavLink>
              <NavLink to="/support" className="header-link">Support</NavLink>
              
              <div className="header-divider"></div>

              <Link to="/login" className="header-link">Log In</Link>
              <Link to="/signup" className="header-btn signup-btn">Sign Up</Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;