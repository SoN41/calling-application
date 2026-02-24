import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ZegoCloud = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const isHost = user?.role === "Host";

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/meetings");
        if (response.ok) {
          const data = await response.json();
          const scheduledOnly = data.filter(meeting => meeting.title !== "Instant Meeting");
          setMeetings(scheduledOnly);
        }
      } catch (error) {
        console.error("Failed to fetch meetings", error);
      }
    };

    fetchMeetings();
  }, [refreshTrigger]);

  const createRoom = async () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    try {
      const response = await fetch("http://localhost:5000/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Instant Meeting",
          roomId: randomId,
          scheduledAt: new Date().toISOString(),
          hostName: user?.username || "Unknown Host"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return alert(`Database error: ${errorData.message}`);
      }
      navigate(`/room/${randomId}`);
    } catch (error) {
      console.log(error);
      alert("Server connection error.");
    }
  };

  const joinRoom = async () => {
    if (!value.trim()) return alert("Please enter a Room ID");
    try {
      const response = await fetch(`http://localhost:5000/api/meetings/${value}`);
      if (response.ok) {
        navigate(`/room/${value}`);
      } else {
        alert(`This Room ID does not exist!`);
      }
    } catch (error) {
      console.log(error);
      alert("Error connecting to the server to validate room.");
    }
  };

  const scheduleMeeting = async (e) => {
    e.preventDefault();
    if (!title || !date) return alert("Please enter a title and date.");
    const randomId = Math.random().toString(36).substring(2, 8);

    try {
      const response = await fetch("http://localhost:5000/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          roomId: randomId,
          scheduledAt: date,
          hostName: user.username
        }),
      });

      if (response.ok) {
        setTitle("");
        setDate("");
        setRefreshTrigger((prev) => prev + 1);
        alert("Meeting scheduled successfully!");
      }
    } catch (error) {
      console.log(error);
      alert("Error scheduling meeting. Is the backend running?");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* LEFT COLUMN: Main Dashboard */}
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="user-welcome">
            Welcome, {user?.username} <br />
            <span className="user-role">{user?.role}</span>
          </div>
          <button onClick={handleLogout} className="btn-danger-text">Logout</button>
        </div>

        <h1 className="home-title" style={{ textAlign: "center" }}>🎥 Video App</h1>
        <p className="home-subtitle" style={{ textAlign: "center" }}>
          {isHost ? "Create or schedule a meeting" : "Join your scheduled meeting"}
        </p>

        {isHost && (
          <>
            <button className="join-button success" onClick={createRoom}>
              ➕ Start Instant Meeting
            </button>
            
            <div className="divider" style={{ textAlign: "center" }}>OR SCHEDULE ONE</div>

            <form onSubmit={scheduleMeeting}>
              <div className="form-group">
                <label className="form-label">Meeting Title</label>
                <input type="text" placeholder="e.g. Weekly Consultation" value={title} onChange={(e) => setTitle(e.target.value)} className="home-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Date & Time</label>
                <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="home-input" required />
              </div>
              <button type="submit" className="join-button btn-warning">
                📅 Schedule Meeting
              </button>
            </form>
            
            <div className="divider" style={{ textAlign: "center" }}>OR JOIN EXISTING</div>
          </>
        )}

        <div className="form-group">
          <label className="form-label">Room ID</label>
          <input type="text" placeholder="Enter Room ID manually" value={value} onChange={(e) => setValue(e.target.value)} className="home-input" />
        </div>
        <button className="join-button" onClick={joinRoom}>🔗 Join Room</button>
      </div>

      {/* RIGHT COLUMN: Upcoming Meetings List (HIDDEN FROM GUESTS) */}
      {isHost && (
        <div className="dashboard-card">
          <h2 className="home-title" style={{ fontSize: "20px", marginBottom: "20px" }}>📅 Upcoming Meetings</h2>

          {meetings.length === 0 ? (
            <p className="user-welcome">No upcoming meetings scheduled.</p>
          ) : (
            <div className="meetings-list">
              {meetings.map((meeting) => (
                <div key={meeting._id} className="meeting-card">
                  <h3 className="meeting-title">{meeting.title}</h3>
                  <div className="meeting-details">
                    <strong>Host:</strong> {meeting.hostName} <br />
                    <strong>Time:</strong> {new Date(meeting.scheduledAt).toLocaleString()}
                  </div>
                  
                  <div className="button-group">
                    <button onClick={() => navigate(`/room/${meeting.roomId}`)} className="join-button" style={{ margin: 0 }}>
                      Join Meeting
                    </button>
                    <button onClick={() => {
                        navigator.clipboard.writeText(meeting.roomId);
                        alert(`Room ID copied: ${meeting.roomId}`);
                      }} 
                      className="join-button btn-outline" style={{ margin: 0 }}>
                      📋 Copy ID
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ZegoCloud;