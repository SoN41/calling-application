import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Page Imports
import ZegoCloud from './pages/ZegoCloud'
import Video_Room from './pages/Video_Room'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'               
import MeetingHistory from './pages/MeetingHistory' 

// Component & Context Imports
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout' 
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* ROUTES WITH HEADER & FOOTER */}
          <Route element={<Layout />}>
            
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {/* Protected Routes inside Layout */}
            <Route path='/' element={<ProtectedRoute><ZegoCloud /></ProtectedRoute>} />
            
            {/* <-- ADD THESE TWO NEW ROUTES --> */}
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/history' element={<ProtectedRoute><MeetingHistory /></ProtectedRoute>} />
            
          </Route>

          {/* FULLSCREEN ROUTES (NO HEADER/FOOTER) */}
          <Route path='/room/:id' element={<ProtectedRoute><Video_Room /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App