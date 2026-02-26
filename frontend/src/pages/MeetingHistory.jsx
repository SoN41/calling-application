import React from "react";
import { useNavigate } from "react-router-dom";

const MeetingHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="home-title">Meeting History</h1>
        <p className="home-subtitle">Review your past video consultations</p>
        
        <div style={{ 
          marginTop: "30px", 
          padding: "40px 20px", 
          backgroundColor: "#f8fafc", 
          borderRadius: "12px", 
          border: "2px dashed #cbd5e1",
          textAlign: "center"
        }}>
          <span style={{ fontSize: "32px", display: "block", marginBottom: "10px" }}>📭</span>
          <h3 style={{ color: "#475569", marginBottom: "8px" }}>No Past Meetings Found</h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
            Your completed video calls will appear here.
          </p>
          
          <button 
            onClick={() => navigate("/")} 
            className="join-button btn-outline" 
            style={{ width: "auto", padding: "8px 24px", margin: "0 auto" }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingHistory;