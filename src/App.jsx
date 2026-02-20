import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ZegoCloud from './ZegoCloud'
import Video_Room from './video_room'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={< ZegoCloud/> }/>
        <Route path='/room/:id' element={ <Video_Room /> } />?
      </Routes>
    </BrowserRouter>
  )
}

export default App