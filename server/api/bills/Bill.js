const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  store: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  items: [{
    itemId:{
        type: Schema.ObjectId,
        ref: 'products'
      },
    quantity: String,
    price: String
  }],
  userId: {
    type: Schema.ObjectId,
    ref: 'users'
  },
  lastUpdated: Date,
  lastUpdatedBy: String,
})

module.exports = Bill = mongoose.model('bills', BillSchema)
