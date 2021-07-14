const jwt = require('jsonwebtoken')
const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Body can not be empty!"
    });
  }
  
  // Get User from Body
  const { email, name } = req.body

  // Save User in the database
  User.create({email, name}, (err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  else res.send(data);
  });
};

// Login user
exports.login = (req, res) => {
  var email = req.body.email

  User.login(email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${req.body.email}`
        });
      } else {
      res.status(500).send({
        message: "Error retrieving User with email " + req.body.email
      });
      }
      return
    }

    const user = data.email
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })

  })
};

// get current session
exports.findSession = (req, res) => {
  User.findSession((err, data) => {
    if (err) {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving users."
      });
    } else {
      const __session = data.map(data => {return {active: data.active, token: data.token}})[0]
      res.render('index', { title: 'IVS', session: __session })
    }
  })
}

// set new session
exports.setSession = (req, res) => {
  const {active, token} = req.body
  User.setSession({active, token}, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving users."
      });
    } else res.send(data)
  })
}

// Find a single User with a UserId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
      res.status(500).send({
        message: "Error retrieving User with id " + req.params.userId
      });
      }
    } else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
  })
}