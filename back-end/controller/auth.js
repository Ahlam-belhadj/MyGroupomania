const db = require('../config')

exports.addUser = (req, res) => {

    const { firstName, lastName, password, role, email } = req.body;
  
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Operation failed" });
      } else {
        const newUser = { firstName, lastName , password: hashedPassword, role, email };
        db.query("INSERT INTO users SET ?", newUser, (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).json({ error: "Operation failed" });
          } else {
            const user = { id: result.insertId, ...newUser };
            const token = generateToken(user);
            res.status(201).json({
              message: "User created successfully",
              token: token,
            });
          }
        });
      }
    });
}
