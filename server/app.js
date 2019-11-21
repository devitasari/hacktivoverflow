if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV)
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3000
// const MONGODB_URI =process.env.MONGODB_URI
const MONGODB_URI = "mongodb://localhost:27017/hoflocal"

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to mongodb!')
})
.catch(() => {
  console.log('Failed connect to mongodb!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => console.log('App listening on port', PORT))
