import React, { useEffect, useState } from 'react'
import { api } from '../lib.js'  // axios instance
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Menu() {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    api.get('/foods')
      .then(res => setItems(res.data))
      .catch(err => console.error('Error fetching foods:', err))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (food) => {
    setCart(prev => {
      const found = prev.find(i => i.food === food._id)
      if (found) return prev.map(i => i.food === food._id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { food: food._id, qty: 1, name: food.name, price: food.price }]
    })
    toast.success(`✅ Added ${food.name} to Cart!`)
  }

  return (
    <div className="container">
      <h2 className="text-center">Menu</h2>

      {items.length === 0 ? (
        <p className="text-center">No items available</p>
      ) : (
        <div className="grid">
          {items.map(food => (
            <div key={food._id} className="card">
              <img
                src={food.image ? food.image : 'https://placehold.co/400x240'}
                alt={food.name}
              />
              <b>{food.name}</b>
              <small>{food.description}</small>
              <b>₹{food.price}</b>
              <button className="btn" onClick={() => addToCart(food)}>Add</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
