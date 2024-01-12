import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
         <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
