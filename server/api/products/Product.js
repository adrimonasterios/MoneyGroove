const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  lastUpdated: Date,
  lastUpdatedBy: String,
})

module.exports = Product = mongoose.model('products', ProductSchema)
