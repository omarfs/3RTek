const express = require('express')

const router = express.Router()
const Order = require('../models/order')
const middleware = require('../middleware')

// INDEX - show all Orders
router.get('/', (req, res) => {
  // Get all Orders from DB
  Order.find({}, (err, allOrders) => {
    if (err) {
      console.log(err)
    } else {
      res.render('orders/index', { orders: allOrders })
    }
  })
})

// CREATE - add new Order to DB
router.post('/', (req, res) => {
  // get data from form and add to Orders array
  const { id, status } = req.body.order
  const client = {name: 'omar',
                  email: 'omar@gmail.com'
  }
  const newOrder = { id, status, client}
  console.log(newOrder)
  // Create a new Order and save to DB
  Order.create(newOrder, (err, newlyCreated) => {
    if (err) {
      console.log(err)
    } else {
      // redirect back to the Orders page
      res.redirect('/orders')
    }
  })
})

// NEW - show form to create new Order
router.get('/new', (req, res) => {
  res.render('orders/new')
})

// SHOW - shows more info about one Order
router.get('/:id', (req, res) => {
  // find the Order with provided ID
  Order.findById(req.params.id, (err, foundOrder) => {
    if (err || !foundOrder) {
      // req.flash('error', 'Order not found')
      res.redirect('back')
      console.log(err)
    } else {
      // render show template with that Order
      res.render('orders/show', { Order: foundOrder })
    }
  })
})

// EDIT Route
router.get('/:id/edit', (req, res) => {
  Order.findById(req.params.id.trim(), (err, foundOrder) => {
    res.render('orders/edit', { Order: foundOrder })
  })
})

// UPDATE route
router.put('/:id', (req, res) => {
  // find and update the correct Order
  console.log('=================')
  console.log(req.params.id)
  Order.findByIdAndUpdate(req.params.id, req.body.Order, (err, updatedOrder) => {
    if (err) {
      res.redirect('/orders')
    } else {
      res.redirect(`/orders/${req.params.id}`)
    }
  })
})

// DESTROY Route
router.delete('/:id', (req, res) => {
  Order.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/orders')
    } else {
      res.redirect('/orders')
    }
  })
})

module.exports = router
