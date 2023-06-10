const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const port = 8000;
const dotenv = require('dotenv')
const public = path.join(__dirname, 'public');
const routePage = require('./routes/pages');
const flash = require('connect-flash');

dotenv.config({path:'../back-end/.env'})

app.use(express.static(public));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use('/', routePage)
app.use('/auth' , require('../back-end/routes/routes') )

app.set('view engine', 'ejs');
app.set('views', 'C:/Users/prfe9/Desktop/Groupo/front-end/views');


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

