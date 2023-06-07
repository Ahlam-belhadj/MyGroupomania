const express = require('express')
const app = express()
const ejs= require('ejs')
const path = require('path')
const route =  require('./routes/routes')
const bodyParser = require('body-parser')

app.use(express.static('../front-end/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//middleware qui permet de traiter les données de la requeste
app.use(express.json());
app.use(express.urlencoded({ extended: true,})); 

app.use('/', route)

app.listen(3000, () => {
  console.log('Back-end')
})
