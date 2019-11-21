const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Keys = require("../../config/keys");

// Load User model
const User = require("../../models/User");

// @route          Get api/users/test
// @description    Test users route
// @access         Puplic
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route          Get api/users/register
// @description    Register user
// @access         Puplic
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route          Get api/users/login
// @description    Login User , Returning JET Token
// @access         Puplic
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //res.json({ msg: "Success" });
        // User Matched

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create jwt payload

        // Sign Token
        jwt.sign(
          payload,
          Keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
