import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router"
import { LoginPage, SignupPage, ProfilePage, ChatPage } from './pages'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/chat' element={<ChatPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App