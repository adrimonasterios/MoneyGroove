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
  category: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'users'
  },
  lastUpdated: Date,
  lastUpdatedBy: String,
})

module.exports = Product = mongoose.model('products', ProductSchema)
