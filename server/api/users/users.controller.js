const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config").keys;
const User = require("./User");

class UsersController {
  async create(req, res, next) {
    try {
      const data = req.body
      User.findOne({ email: data.email }).then(user => {
        if (user) {
          return res.status(400).json({error: "Email already exists" });
        } else {
          const newUser = new User({
            name: data.name,
            email: data.email,
            password: data.password,
            lastLogin: Date.now(),
            lastUpdated: Date.now(),
            // lastUpdatedBy: String,
          });
    // Hash password before saving in database
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
    } catch(err) {
      console.log(`error while creating user: ${err}`);
      throw err;
    }
  }

  async authenticate(req, res, next) {
    try {
      const data = req.body
      const email = data.email;
      const password = data.password;
      // Find user by email
      User.findOne({ email }).then(user => {
        if (!user) {
          res.status(404).json({ error: "Credenciales Incorrectas" });
          return
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if(isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name
            };
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ error: "Credenciales Incorrectas" });
          }
        });
      });

    } catch(err) {
      console.log(`error while creating user: ${err}`);
      throw err;
    }
  }
}

module.exports = new UsersController();
