import express from 'express';
import Food from '../models/Food.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// client maintains cart; server validates and prices items
router.post('/price', protect, async (req, res) => {
  const { items=[] } = req.body; // [{food:id, qty}]
  const ids = items.map(i => i.food);
  const foods = await Food.find({ _id: { $in: ids } });
  const map = new Map(foods.map(f => [String(f._id), f]));
  const priced = items.map(i => ({
    food: i.food,
    qty: i.qty,
    price: map.get(String(i.food))?.price || 0,
    subtotal: (map.get(String(i.food))?.price || 0) * i.qty
  }));
  const total = priced.reduce((a,b)=>a+b.subtotal,0);
  res.json({ items: priced, total });
});

export default router;
