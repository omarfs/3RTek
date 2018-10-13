const express = require('express')

const router = express.Router()
const Client = require('../models/client')
const middleware = require('../middleware')

// INDEX - show all Clients
router.get('/', (req, res) => {
  // Get all Clients from DB
  Client.find({}, (err, allClients) => {
    if (err) {
      console.log(err)
    } else {
      res.render('clients/index', { clients: allClients })
    }
  })
})

// CREATE - add new Client to DB
router.post('/', (req, res) => {
  // get data from form and add to Clients array
  const { name, address, city, zip, phone, email, company, comments } = req.body
  const newClient = { name, address, city, zip, phone, email, company, comments }
  // Create a new Client and save to DB
  Client.create(newClient, (err, newlyCreated) => {
    if (err) {
      console.log(err)
    } else {
      // redirect back to the Clients page
      res.redirect('/Clients')
    }
  })
})

// NEW - show form to create new Client
router.get('/new', (req, res) => {
  res.render('clients/new')
})

// SHOW - shows more info about one Client
router.get('/:id', (req, res) => {
  // find the Client with provided ID
  Client.findById(req.params.id, (err, foundClient) => {
    if (err || !foundClient) {
      // req.flash('error', 'Client not found')
      res.redirect('back')
      console.log(err)
    } else {
      // render show template with that Client
      res.render('clients/show', { client: foundClient })
    }
  })
})

// EDIT Route
router.get('/:id/edit', (req, res) => {
  Client.findById(req.params.id.trim(), (err, foundClient) => {
    res.render('clients/edit', { client: foundClient })
  })
})

// UPDATE route
router.put('/:id', (req, res) => {
  // find and update the correct Client
  console.log('=================')
  console.log(req.params.id)
  Client.findByIdAndUpdate(req.params.id, req.body.client, (err, updatedClient) => {
    if (err) {
      res.redirect('/clients')
    } else {
      res.redirect(`/clients/${req.params.id}`)
    }
  })
})

// DESTROY Route
router.delete('/:id', (req, res) => {
  Client.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/clients')
    } else {
      res.redirect('/clients')
    }
  })
})

module.exports = router
