const mongoose = require('mongoose');

//Creating Books schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  quantity: { type: Number, required: true },
  imageUrl: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


//Creating Products model from products schema
module.exports = mongoose.model('Product', productSchema);
