const mongoose = require('mongoose');

//Creating Books schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  quantity: { type: Number, required: true },
  imageUrl: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
  { timestamps: true });


//Creating Products model from products schema
module.exports = mongoose.model('Product', productSchema);
