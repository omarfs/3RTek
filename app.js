const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const localStrategy = require('passport-local')
const methodOverride = require('method-override')
const passportLocalMongoose = require('passport-local-mongoose')


const User = require('./models/user')
const Client = require('./models/client')
const Order = require('./models/order')

const indexRoutes = require('./routes/index')
const clientRoutes = require('./routes/clients')
const orderRoutes = require('./routes/orders')

mongoose.connect('mongodb://localhost/threeRTek', { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))
app.use(methodOverride('_method'))
app.use(require('express-session')({
  secret: 'This is the secret sentence to salt the recipe',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use(indexRoutes)
app.use('/clients', clientRoutes)
app.use('/orders', orderRoutes)

//
app.listen('3000', process.env.PORT, process.env.IP, () => {
  console.log('server started...')
})
