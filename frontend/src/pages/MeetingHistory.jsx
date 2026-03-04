import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MeetingHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pastMeetings, setPastMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.username) return;

      try {
        const response = await fetch(
          `${import.meta.env.ZEGO_VITE_API_URL}/api/meetings/history/${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setPastMeetings(data);
        }
      } catch (error) {
        console.error("Failed to fetch meeting history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  // Helper function to pick the right badge color based on the status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed": return <span className="badge badge-completed">Completed</span>;
      case "Missed": return <span className="badge badge-missed">Missed</span>;
      case "Cancelled": return <span className="badge badge-cancelled">Cancelled</span>;
      default: return <span className="badge badge-cancelled">{status}</span>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card" style={{ maxWidth: "800px", margin: "0 auto", width: "100%", textAlign: "left" }}>
        <h1 className="home-title" style={{ textAlign: "center" }}>Meeting History</h1>
        <p className="home-subtitle" style={{ textAlign: "center" }}>Review your past video consultations</p>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <p className="home-subtitle">Loading past meetings...</p>
          </div>
        ) : pastMeetings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "2px dashed #cbd5e1" }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "10px" }}>📭</span>
            <h3 style={{ color: "#475569", marginBottom: "8px" }}>No Past Meetings Found</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
              Your completed video calls will appear here.
            </p>
            <button onClick={() => navigate("/")} className="join-button btn-outline" style={{ width: "auto", padding: "8px 24px" }}>
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="meetings-list">
            {pastMeetings.map((meeting) => (
              <div key={meeting._id} className="meeting-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>

                {/* Left Side: Info */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <h3 className="meeting-title" style={{ margin: 0 }}>{meeting.title}</h3>
                    {getStatusBadge(meeting.status)}
                  </div>

                  <div className="meeting-details">
                    <strong>Date:</strong> {new Date(meeting.scheduledAt).toLocaleDateString()} at {new Date(meeting.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <br />
                    <strong>With:</strong> {user?.role === "Host" ? meeting.guestName : meeting.hostName} <br />
                    {meeting.status === "Completed" && <span><strong>Duration:</strong> {meeting.duration}</span>}
                  </div>
                </div>

                {/* Right Side: Action (Only Hosts can book again) */}
                <div>
                  {user?.role === "Host" && (
                    <button
                      onClick={() => alert(`This would open the scheduler for ${meeting.guestName}`)}
                      className="join-button btn-outline"
                      style={{ margin: 0, padding: "8px 16px" }}
                    >
                      📅 Book Again
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingHistory;