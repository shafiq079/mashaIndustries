const mongoose = require('mongoose');

const AiImageSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AiImage', AiImageSchema);