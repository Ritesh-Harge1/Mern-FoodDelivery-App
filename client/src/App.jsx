import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { getToken, setToken, clearToken, api } from './lib.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = () => {
  const navigate = useNavigate()
  const token = getToken()
  const logout = () => { clearToken(); navigate('/') }
  return (
    <div className="nav container">
      <Link to="/"><b>MERN Eats</b></Link>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        {token ? <>
          <Link to="/orders">Orders</Link>
          <button className="btn" onClick={logout}>Logout</button>
        </> : <>
          <Link to="/login">Login</Link>
          <Link className="btn" to="/signup">Signup</Link>
        </>}
      </div>
    </div>
  )
}

export default function App(){
  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
      <div className="footer">© {new Date().getFullYear()} MERN Eats</div>
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  )
}
