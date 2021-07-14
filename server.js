require('dotenv').config()
const express = require('express')

const User = require("./app/models/user.model");
const users = require("./app/controllers/user.controller");

const app = express()
app.use(express.json())


require("./app/routes/user.routes.js")(app);

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', users.findSession)
  
app.listen(3000)