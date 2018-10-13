const mongoose = require('mongoose')

// SCHEMA SETUP
const orderItemSchema = new mongoose.Schema({
  client_id: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    },
  order_id: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem" 
    }
  },
  brand: String,
  model: String,
  serial: String,
  imei: String,
  password: String,
  serviceProvider: String,
  accessories: String
})

module.exports = mongoose.model('orderItem, orderItemsSchema)
