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
  // brand: {
  //   type: Schema.ObjectId,
  //   ref: 'Brands'
  // },
  unit: {
    type: String,
    required: true
  },
  lastUpdated: Date,
  lastUpdatedBy: String,
})

module.exports = Product = mongoose.model('products', ProductSchema)
