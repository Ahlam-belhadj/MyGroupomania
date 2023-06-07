const express = require('express');
const app = express.Router();

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/profil', (req, res) => {
    res.render('profil')
})


module.exports = app;