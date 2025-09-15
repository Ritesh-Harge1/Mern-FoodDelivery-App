import express from 'express';
import Order from '../models/Order.js';
import Food from '../models/Food.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.food');
  res.json(orders);
});

router.post('/', protect, async (req, res) => {
  const { items=[], address='' } = req.body;
  if (!items.length) return res.status(400).json({ message: 'Empty order' });
  const foods = await Food.find({ _id: { $in: items.map(i=>i.food) } });
  const map = new Map(foods.map(f=>[String(f._id), f.price]));
  const total = items.reduce((a,b)=> a + (map.get(String(b.food))||0)*b.qty, 0);
  const order = await Order.create({ user: req.user.id, items, total, address });
  res.status(201).json(order);
});

export default router;
