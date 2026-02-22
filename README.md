# 🎥 Full-Stack Video Calling Application

A full-stack, role-based video conferencing platform built with the MERN stack (MongoDB, Express, React, Node.js) and powered by ZegoCloud. 

This application allows "Hosts" (consultants, doctors, admins) to schedule and manage video meetings, while allowing "Guests" (clients, patients) to securely join validated rooms via a shared Room ID.

## ✨ Features

* **Role-Based Authentication:** Secure JWT-based login and signup system separating users into "Host" and "Guest" roles.
* **Host Dashboard:** Hosts can create instant meetings or schedule future meetings. Scheduled meetings are saved to the database and displayed on their dashboard.
* **Guest Validation:** Guests can only join active, scheduled rooms. The backend validates the Room ID against the MongoDB database before granting access.
* **Live Video & Audio:** High-quality, real-time video conferencing powered by ZegoCloud UIKits.
* **Smart Room Management:** Easy "Copy Room ID" functionality. Rooms are automatically deleted from the database the moment the Host ends the call to keep the schedule clean.
* **Modern UI:** Responsive, gradient-styled user interface built with React.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* React Router DOM (for navigation & protected routes)
* Context API (for state & auth management)
* ZegoCloud UIKit Prebuilt (for WebRTC video infrastructure)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database modeling)
* JSON Web Tokens (JWT) (Authentication)
* Bcrypt.js (Password hashing)

## 🚀 Getting Started

Follow these instructions to run the project on your local machine.

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and cluster.
* A [ZegoCloud](https://www.zegocloud.com/) account (App ID and Server Secret).

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
