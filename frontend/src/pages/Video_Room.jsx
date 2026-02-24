import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Video_Room = () => {
  const { id } = useParams();
  const meetingRef = useRef(null);
  const hasJoined = useRef(false); 
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initMeeting = async () => {
      if (hasJoined.current) return;
      hasJoined.current = true;

      const appID = Number(import.meta.env.ZEGO_APP_ID);
      const serverSecret = import.meta.env.ZEGO_SERVER_SECRET;

      if (!appID || !serverSecret) {
        alert("Missing Zego credentials in .env file. Did you use the VITE_ prefix?");
        return;
      }

      const userID = Date.now().toString();
      const userName = user ? `${user.username} (${user.role})` : "Guest";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      const isHost = user?.role === "Host";

      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showScreenSharingButton: isHost,
        turnOnMicrophoneWhenJoining: isHost,
        turnOnCameraWhenJoining: isHost,
        onLeaveRoom: async () => {
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
          navigate("/");
        },
      });
    };

    if (meetingRef.current) {
      initMeeting();
    }
  }, [id, user, navigate]);

  return (
    <div ref={meetingRef} className="video-container" />
  );
};

export default Video_Room;