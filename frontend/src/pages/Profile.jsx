import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="home-title">My Profile</h1>
        <p className="home-subtitle">Manage your account details</p>
        
        <div style={{ marginTop: "24px" }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="home-input" 
              value={user?.username || ""} 
              disabled 
              style={{ backgroundColor: "#e2e8f0", cursor: "not-allowed" }}
            />
            <small style={{ color: "#64748b", fontSize: "12px" }}>Username cannot be changed.</small>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label">Account Role</label>
            <input 
              type="text" 
              className="home-input" 
              value={user?.role || ""} 
              disabled 
              style={{ backgroundColor: "#e2e8f0", cursor: "not-allowed" }}
            />
          </div>

          <button className="join-button" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
            Save Changes (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;