import React, { useState, useEffect } from 'react'
import { api } from '../lib.js'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')||'[]'))
  const [address, setAddress] = useState('')
  const nav = useNavigate()

  const place = async () => {
    if (!cart.length) return alert('Cart empty')
    try{
      const res = await api.post('/orders', { items: cart.map(({food, qty})=>({food, qty})), address })
      localStorage.removeItem('cart')
      alert('Order placed!')
      nav('/orders')
    }catch(e){
      alert(e.response?.data?.message || e.message)
    }
  }

  return (
    <div>
      <h2>Checkout</h2>
      <textarea className="input" rows="4" placeholder="Delivery address"
        value={address} onChange={e=>setAddress(e.target.value)}/>
      <button className="btn" onClick={place} style={{marginTop:12}}>Place Order</button>
    </div>
  )
}
