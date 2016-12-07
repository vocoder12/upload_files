'use strict'
const formidable = require ('formidable')
const path = require('path')
const fs = require('fs')
const mongoose = require ('mongoose')
const express = require ('express')
const app = express()
const User = require ('../models/userModel')

exports.registerUser = (req,res) => {
    var avatarPath;
    var filePath;
    var user = new User();
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/uploads'); 
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) { 
        avatarPath = user._id + "_" + files.file.name;       
        user.name = fields.name;
        user.email = fields.email;
        user.avatar = avatarPath;
        filePath = files.file.path;                 
    });
    
    form.on('file', function(field, file) {
        user.save()
        .then((user) => { 
        })               
        .catch((err) => {
            fs.unlink(filePath);
            res.send('El usuario no ha podido guardarse: ', err);
        })
    });

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });
    form.on('end', function() { 
        fs.rename(filePath, path.join(form.uploadDir, avatarPath));  
        res.send({user:user})
    }); 
}

exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
      if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(!users) return res.status(404).send({message: `No existen usuarios`})
      res.render('users.hbs',{users})
    })
}