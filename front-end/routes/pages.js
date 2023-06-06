const express = require('express');
const app = express.Router();
const usersCTRL = require('../controller/users')


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/profil', (req, res) => {
res.render('profil')
  });

app.get('/logout', usersCTRL.logout)
app.post('/register',usersCTRL.postUser)
app.get('/home', usersCTRL.getAllUsers)
app.post('/login' ,usersCTRL.login)

module.exports = app;