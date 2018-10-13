const express = require('express')

const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

// Home page
router.get('/', (req, res) => {
  res.render('home')
})

// SHOW register/sing up form
router.get('/register', (req, res) => {
  res.render('register')
})

// Handle SIGN UP logic
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      // console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/')
    })
  })
})

// SHOW login form
router.get('/login', (req, res) => {
  res.render('login')
})

// Handle LOGIN logic with middleware using passport
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), (req, res) => {

})

// Handle LOGOUT logic
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
