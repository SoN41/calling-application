import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ZegoCloud from './pages/ZegoCloud'
import Video_Room from './pages/Video_Room'
import Login from './pages/Login'
import Signup from './pages/Signup' // Import Signup
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Protected Routes */}
          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <ZegoCloud />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/room/:id' 
            element={
              <ProtectedRoute>
                <Video_Room />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App