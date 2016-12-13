'use strict'
const express = require ('express')
const router = express.Router()
const app = express()
const userController = require('../controllers/userController')

app.route('/register')
    .post(userController.registerUser)
app.route('/users')
    .get(userController.getAllUsers)

module.exports = app