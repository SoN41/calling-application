# 🎥 Full-Stack Video Calling Application

A full-stack, role-based video conferencing platform built with the MERN stack (**MongoDB, Express, React, Node.js**) and powered by **ZegoCloud**.

This application allows **Hosts** (consultants, doctors, admins) to schedule and manage video meetings, while allowing **Guests** (clients, patients) to securely join validated rooms via a shared Room ID.

---

## ✨ Features

* **Role-Based Authentication:** Secure JWT-based login and signup system separating users into "Host" and "Guest" roles.
* **Host Dashboard:** Hosts can create instant meetings or schedule future meetings. Scheduled meetings are saved to the database and displayed on their dashboard.
* **Guest Validation:** Guests can only join active, scheduled rooms. The backend validates the Room ID against MongoDB before granting access.
* **Live Video & Audio:** High-quality, real-time video conferencing powered by ZegoCloud UIKits.
* **Smart Room Management:** Easy "Copy Room ID" functionality. Rooms are automatically deleted from the database when the Host ends the call.
* **Modern UI:** Responsive, gradient-styled interface built with React.

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router DOM (Protected Routes)
* Context API (State & Auth Management)
* ZegoCloud UIKit Prebuilt (WebRTC infrastructure)

### Backend

* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* Bcrypt.js (Password hashing)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

---

### ✅ Prerequisites

* Node.js installed
* MongoDB Atlas account & cluster
* ZegoCloud account (App ID and Server Secret)

---

## ⚠️ IMPORTANT SECURITY NOTICE (Before Pushing to GitHub)

Before running:

```bash
git push origin main
```

**Make sure your ZegoCloud credentials are NOT hardcoded in your frontend files.**

If your `appID` or `serverSecret` are inside:

```
frontend/src/pages/Video_Room.jsx
```

🚨 **STOP and move them into environment variables first.**

### Why?

If you push hardcoded credentials to GitHub:

* Bots can scrape your keys
* Someone can abuse your ZegoCloud account
* You may incur unexpected charges
* Your account could be compromised

---

## 🔐 How to Secure Your ZegoCloud Credentials

### 1️⃣ Create a `.env` file in the frontend folder

```
frontend/.env
```

Add:

```env
VITE_ZEGO_APP_ID=your_app_id_here
VITE_ZEGO_SERVER_SECRET=your_server_secret_here
```

---

### 2️⃣ Update `Video_Room.jsx`

Replace hardcoded values with:

```javascript
const appID = import.meta.env.VITE_ZEGO_APP_ID;
const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
```

---

### 3️⃣ Add `.env` to `.gitignore`

Make sure your `.gitignore` contains:

```
.env
```

---

### 4️⃣ If You Already Pushed Keys

If credentials were already pushed:

1. Immediately regenerate your ZegoCloud Server Secret from the dashboard.
2. Remove secrets from the repository.
3. Commit the changes.
4. Push again.

---

## 🖥️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

---

## 🔹 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
```

Start backend server:

```bash
npm run dev
```

---

## 🔹 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Visit:

```
http://localhost:5173
```

---

## 💻 Usage

### 👤 Host

* Sign up as **Host**
* Create instant meetings or schedule future meetings
* Copy and share Room ID

### 👥 Guest

* Sign up as **Guest**
* Enter valid Room ID
* Join active scheduled meeting

---

## 📁 Project Structure

```
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📝 License

This project is open source and available under the MIT License.

---
