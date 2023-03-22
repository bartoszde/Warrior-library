const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;


//GET /signup
router.get("/signup", (req, res, next) => {
  res.render("auth/register.hbs");
});



//POST /signup
router.post("/signup", (req, res, next) => {

  const {email, password} = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hash => {
      console.log(`Password hash: ${hash}`);

      return User.create({ email, passwordHash: hash });
    })
    .then( userFromDB  => {
      console.log(userFromDB);
    })
    .catch(error => {
      console.log("error creating account...", error);
      next(error)
    });

});

module.exports = router;
