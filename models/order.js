const mongoose = require('mongoose')

// SCHEMA SETUP
const clientSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  zip: String,
  phone: String,
  email: String,
  company: String,
  comments: String
})
//
const orderItemSchema = new mongoose.Schema({
  brand: String,
  model: String,
  serial: String,
  imei: String,
  password: String,
  serviceProvider: String,
  accessories: String
})
//
const orderSchema = new mongoose.Schema({
  id: String,
  date: { type: Date, default: Date.now },
  status: String,
  client: clientSchema,
  items: [
    orderItemSchema
  ]
})

module.exports = mongoose.model('Order', orderSchema)
