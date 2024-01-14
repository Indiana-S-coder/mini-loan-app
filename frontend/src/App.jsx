import Home from './pages/Home'
import Navbar from './components/Navbar'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ApplyLoan from './pages/ApplyLoan'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './components/AdminDashboard'
import Repay from './components/RepayLoan'
import LoanList from './components/LoanList'


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
         <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/loan/" element={<ApplyLoan/>} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/all-loans" element={<LoanList/>} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/repay/:id" element={<Repay/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
