const express = require('express');
const router = express.Router();
const userCTRL = require('../controller/auth');
const post = require('../controller/post');

// ---------------- ----------------------------------------USERS ROUTES API  ----------------

// -------------------s'inscrire-------------//
router.post("/register", userCTRL.addUser);

// ------------------se connecter------------//
router.post("/login", userCTRL.login);

// -------------------se déconnecter-------------//
router.post("/logout", userCTRL.logout);

// -------------------homepage-------------//
router.get('/home', userCTRL.getAllUsers); 

// ---------------- POST ROUTES API  ----------------

router.post("/post", post.post);

// ---------------- COMMENT ROUTES API  ----------------



// ---------------- LIKE ROUTES API  ----------------


module.exports = router;