const db = require('../config')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require('mysql')

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

exports.postUser = (req, res) => {

    const { firstName, lastName, password,  email , confirmdp} = req.body;
    if (password !== confirmdp) {
      res.status(500).json({ error: "les mdp ne sont pas pareils" });
    }
    
  console.log(req.body);
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Operation bcrypt failed" });
      } else {
        const newUser = { firstName, lastName , password: hashedPassword, email };
        db.query("INSERT INTO users SET ?", newUser, (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).json({ error: "Operation failed par la bdd" });
          } 
        });
        
      }
    });
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email ou mot de passe incorrect" });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  
    console.log(results);
    if (results.length === 0 || !results) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
  
    try {
      const verify = await bcrypt.compare(password, results[0].password);
  
      if (verify) {
        const iduser = results[0].idUser;
        const token = jwt.sign({ iduser }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });
  
        const cookie = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie('Ahlam la star', token, cookie);
        res.status(200).json({ Success: "User Logged" });
      } else {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}




exports.logout = async (req, res) => {
  res.cookie('Ahlam la star', '' ,{
    expires : new Date(0),
    httpOnly : true,
  });
  res.status(400).json({ Succes: "User Logout"})
}
