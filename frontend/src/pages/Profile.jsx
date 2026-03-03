import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  // Local state for the form
  const [fullName, setFullName] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [bio, setBio] = useState("");

  // Loading states for better UX
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch the user's existing profile data when the page loads
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.username) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/profile/${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullName || "");
          setTimezone(data.timezone || "Asia/Kolkata");
          setBio(data.bio || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Get the first letter of the username for the avatar
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : "?";

  // Save changes to the backend
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if using JWT in headers
          // "Authorization": `Bearer ${token}`
        },
        credentials: "include", // only if JWT is stored in cookies
        body: JSON.stringify({
          username: user.username,
          fullName,
          timezone,
          bio
        })
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Network error while saving profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p className="home-subtitle">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card" style={{ maxWidth: "600px", margin: "0 auto" }}>

        <div className="avatar-circle">{initial}</div>
        <h1 className="home-title" style={{ textAlign: "center" }}>My Profile</h1>
        <p className="home-subtitle" style={{ textAlign: "center" }}>Manage your account details and preferences</p>

        <form onSubmit={handleSave} style={{ marginTop: "24px", textAlign: "left" }}>

          <div className="form-group">
            <label className="form-label">System Username (Cannot be changed)</label>
            <input
              type="text"
              className="home-input"
              value={user?.username || ""}
              disabled
              style={{ backgroundColor: "#e2e8f0", cursor: "not-allowed" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Display Name / Full Name</label>
            <input
              type="text"
              className="home-input"
              placeholder="e.g. Dr. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Timezone</label>
            <select
              className="home-input"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>

          {/* Only show the Bio section if the user is a Host */}
          {user?.role === "Host" && (
            <div className="form-group">
              <label className="form-label">Professional Bio / Specialties</label>
              <textarea
                className="home-input"
                placeholder="Tell clients about your expertise..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="join-button success" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;