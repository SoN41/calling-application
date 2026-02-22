import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure correct import path

const Video_Room = () => {
  const { id } = useParams();
  const meetingRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initMeeting = async () => {
      const appID = Number(import.meta.env.ZEGO_APP_ID);
      const serverSecret = import.meta.env.ZEGO_SERVER_SECRET;

      if (!appID || !serverSecret) {
        alert("Missing Zego credentials in .env file");
        return;
      }

      const userID = Date.now().toString();
      // Append the role to the display name so everyone knows who the Host is
      const userName = user ? `${user.username} (${user.role})` : "Guest";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Check if the current user is a Host
      const isHost = user?.role === "Host";

      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          // VideoConference is better for roles than OneONoneCall
          mode: ZegoUIKitPrebuilt.VideoConference,
        },

        // --- ROLE BASED ACCESS CONTROLS ---
        // Only the host can share their screen
        showScreenSharingButton: isHost,

        // Guests start with their mic/camera off by default, Hosts start with them on
        turnOnMicrophoneWhenJoining: isHost,
        turnOnCameraWhenJoining: isHost,

        // Return to home page when the call ends
        onLeaveRoom: async () => {
          // Only the Host should delete the room from the database
          if (user?.role === "Host") {
            try {
              await fetch(`http://localhost:5000/api/meetings/${id}`, {
                method: "DELETE",
              });
              console.log("Room deleted from database.");
            } catch (error) {
              console.error("Failed to delete room:", error);
            }
          }

          // Send everyone back to the dashboard when they hang up
          navigate("/");
        },
      });
    };

    if (meetingRef.current) {
      initMeeting();
    }
  }, [id, user, navigate]);

  return (
    <div
      ref={meetingRef}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default Video_Room;