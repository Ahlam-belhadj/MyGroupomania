const db = require('../config')
const dotenv = require ('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

dotenv.config('../.env')

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

exports.addUser = (req, res) => {

    const { firstName, lastName, password, role, email } = req.body;
  
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Operation failed" });
      } else {
        const newUser = { firstName, lastName , password: hashedPassword, email };
        db.query("INSERT INTO users SET ?", newUser, (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).json({ error: "Operation failed" });
          } else {
            const user = { id: result.insertId, ...newUser };
            const token = generateToken(user);
            console.log(token);
            res.status(201).json({
              message: "User created successfully",
              token: token,
            });
          }
        });
      }
    });
}
