const axios = require('axios');
const db = require('../../back-end/config');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require('mysql')

exports.getAllUsers = async (req, res) => {
const url = "http://localhost:3000/users";

    axios.get(url)
    .then(function (response) {
        // handle success
        if(response.data) {
            const data = response.data;
            res.render('home', {data})
      }
     })
    .catch(function (error) {
        // handle error
       console.log(error);
       res.render('home', {"error": "Un problem dans le serveur"})
    })
   .finally(function () {
       res.render('home')
    });

 }



 function generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  
    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN
    };
  
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }

 exports.postUser = async (req, res) => {
    console.log(req.body);

    // Insérer les données dans la base de données
    const { lastname, password, firstname, email } = req.body;

  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Operation failed" });
    } else {
      const newUser = { lastname, password : hashedPassword , firstname, email };
      db.query("INSERT INTO users SET ?", newUser, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Operation failed" });
        } else {
          res.status(201).json({
            message: "User created successfully",
          });
        }
      });
    }
  });
};


exports.login = async (req, res) => {

const { email , password } = req.body;

  if(!email || !password){
    return res.status(400).json({ error:"Operation failed"})
  }

  db.query('SELECT * from users where email = ?', [email] , async (error, results) =>{
    console.log(results);
    if (results.length === 0 || !results){
      return res.status(400).json({ error: 'Invalid email or password'})
    }else{
      const verify = await bcrypt.compare(password , results[0].password);

      if(verify){
        const iduser = results[0].idUser
        const token = jwt.sign ({ iduser }, process.env.JWT_SECRET , { 
          expiresIn : process.env.JWT_EXPIRES_IN
        });

        const cookie = {
          expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly : true,
        }
        res.cookie('Ahlam la star' , token , cookie);
        res.status(400).json({ Succes: "User Loged"})
      }
    }
  })
}


exports.logout = async (req, res) => {
  res.cookie('Ahlam la star', '' ,{
    expires : new Date(0),
    httpOnly : true,
  });
  res.status(400).json({ Succes: "User Logout"})
}