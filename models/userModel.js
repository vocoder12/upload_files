'use strict'
const mongoose = require ('mongoose')
const Schema = mongoose.Schema


const UserSchema = Schema ({
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: { 
        type: String
    }
})
module.exports = mongoose.model('User', UserSchema)