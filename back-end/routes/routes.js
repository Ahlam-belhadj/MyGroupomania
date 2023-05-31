const express = require('express')
const router = express.Router();
const db = require('../config')


// ---------------- USERS ROUTES API  ----------------
router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (error , results) => {
      if (error){
        console.log(error);
        res.status(500).json({ error: ' Failed to retrieve users'});
      }else {
        res.status(200).json(results)
      }
    })
})




// ---------------- POST ROUTES API  ----------------



// ---------------- COMMENT ROUTES API  ----------------



// ---------------- LIKE ROUTES API  ----------------




module.exports = router;