import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    qty: { type: Number, default: 1, min: 1 }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending','preparing','delivering','completed','cancelled'], default: 'pending' },
  address: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
