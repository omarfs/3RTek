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

module.exports = mongoose.model('Client', clientSchema)
