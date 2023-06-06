const express = require('express')
const router = express.Router();

const userCTRL = require('../controller/auth')


// ---------------- ----------------------------------------USERS ROUTES API  ----------------


// -------------------s'inscrire-------------//
router.post("/register", userCTRL.postUser);




// ---------------- POST ROUTES API  ----------------



// ---------------- COMMENT ROUTES API  ----------------



// ---------------- LIKE ROUTES API  ----------------




module.exports = router;