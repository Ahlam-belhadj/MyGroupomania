const express = require('express')
const app = express()
const ejs= require('ejs')
const port = 3000
const path = require('path')
const route =  require('./routes/routes')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
