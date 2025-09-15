import React, { useEffect, useState } from 'react'
import { api } from '../lib.js'
import { toast } from 'react-toastify'

export default function Menu(){
  const [items, setItems] = useState([])
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')||'[]'))

  useEffect(() => {
    api.get('/foods').then(r => setItems(r.data))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const add = (food) => {
    setCart(prev => {
      const found = prev.find(i => i.food === food._id)
      if (found) return prev.map(i => i.food === food._id ? { ...i, qty: i.qty+1 } : i)
      return [...prev, { food: food._id, qty: 1, name: food.name, price: food.price }]
    })
    toast.success('✅ Added to Cart!')
  }

  return (
    <div>
      <h2>Menu</h2>
      <div className="grid">
        {items.map(f => (
          <div key={f._id} className="card">
            <img src={f.image||'https://placehold.co/400x240'} alt={f.name} style={{width:'100%',borderRadius:8}}/>
            <b>{f.name}</b>
            <small>{f.description}</small>
            <b>₹{f.price}</b>
            <button className="btn" onClick={()=>add(f)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  )
}
