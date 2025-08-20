const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  designName: { type: String, required: true },
  originalNames: { type: [String], required: true },
  imageUrls: { type: [String], required: true },
  quantity: { type: Number, required: true },
  productType: { type: String, required: true },
  productsize: { type: String, required: true },
  material: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String },
  budget: { type: Number },
  totalPrice: { type: Number },
  status: {
    type: String,
    enum: ['pending', 'quoted', 'approved', 'rejected'],
    default: 'pending'
  },
  adminPrice: {
    type: Number
  }
}, {
  timestamps: true
});

const CustomOrderRequestModel = mongoose.model('CustomOrderRequest', fileSchema);
module.exports = CustomOrderRequestModel;