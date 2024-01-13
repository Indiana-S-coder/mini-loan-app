import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ApplyLoan from './pages/ApplyLoan'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
         <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/loan/" element={<ApplyLoan/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
