const express = require('express');
const app = express.Router();
const usersCTRL = require('../controller/users')

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/home', usersCTRL.getAllUsers)


module.exports = app;