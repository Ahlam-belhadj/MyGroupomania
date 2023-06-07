const db = require('../config');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config('../.env');

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

exports.addUser = (req, res) => {
  const { firstName, lastName, password, role, email } = req.body;

  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Operation failed' });
    } else {
      const newUser = { firstName, lastName, password: hashedPassword, email };
      db.query('INSERT INTO users SET ?', newUser, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'Operation failed' });
        } else {
          const user = { id: result.insertId, ...newUser };
          const token = generateToken(user);
          console.log(token);
          res.status(201).json({
            message: 'User created successfully',
            token: token,
          });
        }
      });
    }
  });
};

exports.getAllUsers = async (req, res) => {
  const url = 'http://localhost:3000/users';

  axios
    .get(url)
    .then(function (response) {
      // handle success
      if (response.data) {
        const data = response.data;
        res.render('home', { data });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.render('home', { error: 'Un problème dans le serveur' });
    })
    .finally(function () {
      res.render('home');
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Operation failed' });
  }

  db.query('SELECT * from users where email = ?', [email], async (error, results) => {
    console.log(results);
    if (results.length === 0 || !results) {
      return res.status(400).json({ error: 'Invalid email or password' });
    } else {
      const verify = await bcrypt.compare(password, results[0].password);

      if (verify) {
        const iduser = results[0].idUser;
        const token = jwt.sign({ iduser }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const cookie = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie('Ahlam la star', token, cookie);
        res.status(400).json({ Success: 'User Logged' });
      }
    }
  });
};

exports.logout = async (req, res) => {
  res.cookie('Ahlam la star', '', {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(400).json({ Success: 'User Logout' });
};