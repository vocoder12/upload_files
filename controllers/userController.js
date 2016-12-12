'use strict'
const formidable = require ('formidable')
const path = require('path')
const fs = require('fs')
const mongoose = require ('mongoose')
const express = require ('express')
const app = express()
const User = require ('../models/userModel')

exports.registerUser = (req,res) => {
    var avatarsPath = path.resolve('uploads/avatars/');
    console.log( `Avatars Dir: ${avatarsPath}`);

    var user = new User();
    var form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {       
        user.name = fields.name;
        user.email = fields.email;                
    });

    console.log( `Filename ${user.avatar}`);

    var tempPath;
    form.on('file', function(field, file) {
        tempPath = file.path;
        user.avatar = path.basename( tempPath);
    });

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function() { 
        user.save()
            .then( (user)=>{
                console.log( `temp path: ${tempPath}`);
                var newPath = path.join( avatarsPath, user.avatar);
                console.log( `new avatar img path: ${newPath}`);
                fs.renameSync( tempPath, newPath);
            })
            .catch( (error)=>{
                fs.unlink( tempPath );
                console.log( `temp path: ${tempPath}, error:${error}`);
                res.send( 'el usuario no se ha podido guardar', err);
            });
        res.send({user:user});
    }); 
}

exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
      if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if(!users) return res.status(404).send({message: `No existen usuarios`})
      res.render('users.hbs',{users})
    })
}