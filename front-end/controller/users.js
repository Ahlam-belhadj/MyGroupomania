const axios = require('axios');
const db = require('../../back-end/config');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require('mysql')





exports.postUser = async (req, res) => {
  const url = "http://localhost:3000/register";

  axios.post(url, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  })
    .then(function (response) {
      
      console.log(response);
      res.render ('register' , {messageSucces : "l'utilisateur a bien été enregistré veuillez vous connecté "} )
    })
    .catch(function (error) {
      console.log(error);
      res.render ('register' , {messageError : "veuillez réesseyer "} )
    })

}

exports.login = async (req, res) => {
  const url = "http://localhost:3000/login";

  axios.post(url, {

    email: req.body.email,
    password: req.body.password
  })
    .then(function (response) {
      
      console.log(response);
      res.redirect('/profil')
    })
    .catch(function (error) {
      console.log(error);
      res.render('login' , {messageError : "veuillez réesseyer "} )
    })

}













