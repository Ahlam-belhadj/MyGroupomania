const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const port = 8000;
const dotenv = require('dotenv')
const public = path.join(__dirname, 'public');
const routePage = require('./routes/pages')

dotenv.config({path:'../back-end/.env'})

app.use(express.static(public));
app.use(express.urlencoded({ extended: true }));
app.use('/', routePage)


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

