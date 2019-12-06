const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets');
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password,10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      const token = generateToken(saved)
      res.status(201).json({message: `new user created: ${saved.username}`, token })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  // implement registration
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  Users.findBy({username})
    .first()
    .then(saved => {
      if (saved && bcrypt.compareSync(password, saved.password)) {
        const token = generateToken(saved);
        res.status(200).json({
          message: `Welcome ${saved.username}`,
          token
        })
      } else {
        res.status(401).json({message: "Invalid Credentials"})
      }
    })

});

function generateToken(user) {

  const payload = {
    sub: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
