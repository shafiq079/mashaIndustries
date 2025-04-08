const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String },
  filePath: { type: String},
  quantity: { type: String },
  productType: { type: String },
  productsize: { type: String},
  material: { type: String },
  id: { type: String },
  totalPrice:{type: String}
});

const File = mongoose.model('File', fileSchema);
module.exports = File;