const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
//const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
 //const logger = require('morgan')
 const mainRoute = require('./routes/main');
const connectDB = require('./config/database');

require('./config/passport')(passport)

require('dotenv').config({path: './config/.env'})



app.set('view engine', 'ejs');

connectDB()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
//app.use(logger('dev'))

app.use(session({
    secret: 'mohbad',
    resave: false,
    saveUninitialized: true,
    //: new MongoStore({mongooseConnection: mongoose.connection()}),
  }));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(flash())

app.use('/', mainRoute)

app.listen(process.env.PORT, ()=>{
    console.log(`running on port ${process.env.PORT}`)
})

