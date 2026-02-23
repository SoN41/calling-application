# 🎥 Full-Stack Video Calling Application  

A **full-stack, role-based video conferencing platform** built with the **MERN stack**  
(**MongoDB, Express, React, Node.js**) and powered by ZEGOCLOUD.

This application enables:

- 👤 **Hosts** (consultants, doctors, admins) to create and manage meetings  
- 👥 **Guests** (clients, patients) to securely join validated rooms using a Room ID  

---

# ✨ Features

## 🔐 Role-Based Authentication
- Secure JWT-based login & signup
- Separate access for **Host** and **Guest**
- Protected frontend routes

## 🖥️ Host Dashboard
- Create **instant meetings**
- Schedule **future meetings**
- View all scheduled meetings
- Automatically delete meetings when ended

## ✅ Guest Room Validation
- Guests can only join **active & scheduled** rooms
- Backend validates Room ID against MongoDB
- Prevents unauthorized access

## 📹 Live Video & Audio
- Real-time video conferencing
- Powered by ZEGOCLOUD UIKits
- Smooth WebRTC infrastructure

## 📋 Smart Room Management
- One-click **Copy Room ID**
- Auto-cleanup when host ends meeting
- Clean and intuitive UI

## 🎨 Modern UI
- Responsive design
- Gradient styling
- Built with React (Vite)

---

# 🛠️ Tech Stack

## 🔹 Frontend
- React (Vite)
- React Router DOM (Protected Routes)
- Context API (Authentication & State Management)
- ZEGOCLOUD UIKit (WebRTC video infrastructure)

## 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js (Password hashing)

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

---

# ✅ Prerequisites

Make sure you have:

- Node.js installed
- MongoDB Atlas account & cluster
- ZEGOCLOUD account (App ID & Server Secret)

---

# ⚠️ IMPORTANT SECURITY NOTICE (Before Pushing to GitHub)

Before running:

```bash
git push origin main
```

🚨 **Ensure your ZEGOCLOUD credentials are NOT hardcoded in frontend files.**

If your `appID` or `serverSecret` are inside:

```
frontend/src/pages/Video_Room.jsx
```

🛑 **STOP and move them to environment variables first.**

---

## 🔒 Why This Is Critical

If credentials are pushed to GitHub:

- Bots can scrape your keys
- Your ZEGOCLOUD account can be abused
- You may incur unexpected charges
- Your account could be compromised

---

# 🔐 Securing Your ZEGOCLOUD Credentials

## 1️⃣ Create a `.env` File (Frontend)

Create:

```
frontend/.env
```

Add:

```env
VITE_ZEGO_APP_ID=your_app_id_here
VITE_ZEGO_SERVER_SECRET=your_server_secret_here
```

---

## 2️⃣ Update `Video_Room.jsx`

Replace hardcoded credentials with:

```javascript
const appID = import.meta.env.VITE_ZEGO_APP_ID;
const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
```

---

## 3️⃣ Add `.env` to `.gitignore`

Ensure your `.gitignore` includes:

```
.env
```

---

## 4️⃣ If You Already Pushed Credentials

1. Regenerate your ZEGOCLOUD **Server Secret** immediately.
2. Remove credentials from the codebase.
3. Commit changes.
4. Push again.

---

# 🖥️ Installation Guide

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

---

# 🔹 Backend Setup

```bash
cd backend
npm install
```

Create:

```
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔹 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 💻 How to Use

## 👤 Host Flow

1. Sign up as **Host**
2. Create instant meeting OR schedule meeting
3. Copy and share Room ID
4. End meeting → Room auto-deletes

## 👥 Guest Flow

1. Sign up as **Guest**
2. Enter valid Room ID
3. Join active scheduled meeting

---

# 📁 Project Structure

```
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repository and submit a pull request.

---
