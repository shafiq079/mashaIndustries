const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  quantity: { type: Number, required: true },
  productType: { type: String, required: true },
  productsize: { type: String, required: true },
  material: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String }, // New field
  budget: { type: Number }, // New field
  totalPrice: { type: Number }, // This is the user-calculated price, can be optional
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
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