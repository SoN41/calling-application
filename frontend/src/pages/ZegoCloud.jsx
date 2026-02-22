import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ZegoCloud = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [meetings, setMeetings] = useState([]);

  // 1. We create a simple number state to act as a trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const isHost = user?.role === "Host";

  // 2. We moved the fetch function entirely INSIDE the useEffect.
  // The linter will love this because it is fully self-contained.
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/meetings");
        if (response.ok) {
          const data = await response.json();
          
          // --- THE FIX IS HERE ---
          // Filter out any meeting that has the title "Instant Meeting"
          const scheduledOnly = data.filter(meeting => meeting.title !== "Instant Meeting");
          
          setMeetings(scheduledOnly);
        }
      } catch (error) {
        console.error("Failed to fetch meetings", error);
      }
    };

    fetchMeetings();
  }, [refreshTrigger]);

  // 1. Updated to save Instant Meetings to the database
  const createRoom = async () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    console.log("1. Attempting to save room to DB:", randomId);

    try {
      const response = await fetch("http://localhost:5000/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Instant Meeting",
          roomId: randomId,
          scheduledAt: new Date().toISOString(),
          // Added a fallback just in case the username hasn't loaded
          hostName: user?.username || "Unknown Host"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Backend rejected room creation:", errorData);
        alert(`Database error: ${errorData.message}`);
        return;
      }

      console.log("2. ✅ Room successfully saved to DB!");
      navigate(`/room/${randomId}`);

    } catch (error) {
      console.error("❌ Network error creating room:", error);
      alert("Server connection error.");
    }
  };

  const joinRoom = async () => {
    if (!value.trim()) return alert("Please enter a Room ID");
    console.log("3. Guest attempting to check room:", value);

    try {
      const response = await fetch(`http://localhost:5000/api/meetings/${value}`);
      console.log("4. Check Room Status Code:", response.status);

      if (response.ok) {
        console.log("5. ✅ Room exists! Navigating...");
        navigate(`/room/${value}`);
      } else {
        const errorText = await response.text();
        console.error("❌ Join Room Failed. Backend response:", errorText);
        alert(`This Room ID does not exist! (Error Code: ${response.status})`);
      }
    } catch (error) {
      console.error("❌ Network error checking room:", error);
      alert("Error connecting to the server to validate room.");
    }
  };

  // 2. Updated to check the database before joining
  // const joinRoom = async () => {
  //   if (!value.trim()) return alert("Please enter a Room ID");

  //   try {
  //     // Ask the backend if this room exists
  //     const response = await fetch(`http://localhost:5000/api/meetings/${value}`);

  //     if (response.ok) {
  //       // Room exists! Let them in.
  //       navigate(`/room/${value}`);
  //     } else {
  //       // Room does not exist. Block them and show an error.
  //       alert("❌ This Room ID does not exist! Please check the code and try again.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error connecting to the server to validate room.");
  //   }
  // };

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
        // 4. Instead of calling a function, we just update the trigger.
        // This causes the useEffect above to instantly re-run and grab the fresh data!
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px", minHeight: "100vh", background: "linear-gradient(135deg, #667eea, #764ba2)", gap: "20px", flexWrap: "wrap" }}>

      {/* LEFT COLUMN: Main Dashboard */}
      <div className="home-card" style={{ flex: "1", minWidth: "300px", maxWidth: "400px" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Welcome, {user?.username} <br />
            <strong>({user?.role})</strong>
          </span>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
        </div>

        <h1 className="home-title">🎥 Video App</h1>
        <p className="home-subtitle">{isHost ? "Create or schedule a meeting" : "Join your scheduled meeting"}</p>

        {isHost && (
          <>
            <button className="create-button" onClick={createRoom}>➕ Start Instant Meeting</button>
            <div className="divider">OR SCHEDULE ONE</div>

            <form onSubmit={scheduleMeeting} style={{ marginBottom: "20px", textAlign: "left" }}>
              <input type="text" placeholder="Meeting Title (e.g. Consult)" value={title} onChange={(e) => setTitle(e.target.value)} className="home-input" required />
              <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="home-input" required />
              <button type="submit" className="join-button" style={{ background: "#f59e0b" }}>📅 Schedule Meeting</button>
            </form>
            <div className="divider">OR JOIN EXISTING</div>
          </>
        )}

        <input type="text" placeholder="Enter Room ID manually" value={value} onChange={(e) => setValue(e.target.value)} className="home-input" />
        <button className="join-button" onClick={joinRoom}>🔗 Join Room</button>
      </div>

      {/* RIGHT COLUMN: Upcoming Meetings List (HIDDEN FROM GUESTS) */}
      {isHost && (
        <div className="home-card" style={{ flex: "1", minWidth: "300px", maxWidth: "400px", textAlign: "left" }}>
          <h2 style={{ marginBottom: "15px", color: "#333", fontSize: "20px" }}>📅 Upcoming Meetings</h2>

          {meetings.length === 0 ? (
            <p style={{ color: "#666", fontSize: "14px" }}>No upcoming meetings scheduled.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {meetings.map((meeting) => (
                <div key={meeting._id} style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9fafb" }}>
                  <h3 style={{ fontSize: "16px", marginBottom: "5px", color: "#111" }}>{meeting.title}</h3>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>
                    <strong>Host:</strong> {meeting.hostName} <br />
                    <strong>Time:</strong> {new Date(meeting.scheduledAt).toLocaleString()}
                  </p>
                  {/* Replace the old Join button with this button group */}
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                      onClick={() => navigate(`/room/${meeting.roomId}`)}
                      style={{ flex: 1, padding: "8px", background: "#667eea", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                      Join Meeting
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(meeting.roomId);
                        alert(`Room ID copied: ${meeting.roomId}`);
                      }}
                      style={{ flex: 1, padding: "8px", background: "#10b981", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
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