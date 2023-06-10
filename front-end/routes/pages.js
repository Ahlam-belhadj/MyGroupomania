const express = require('express');
const app = express.Router();
const usersCTRL = require('../controller/users');

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login',usersCTRL.login)

app.get('/register', (req, res) => {

    res.render('register' )
});

app.post('/register',usersCTRL.postUser)


module.exports = app;