const express = require('express')
const router = express.Router();

const userCTRL = require('../controller/auth')


// ---------------- ----------------------------------------USERS ROUTES API  ----------------


// -------------------s'inscrire-------------//
router.post("/register", userCTRL.addUser);
router.post("/login", userCTRL.login);



// ---------------- POST ROUTES API  ----------------



// ---------------- COMMENT ROUTES API  ----------------



// ---------------- LIKE ROUTES API  ----------------




module.exports = router;