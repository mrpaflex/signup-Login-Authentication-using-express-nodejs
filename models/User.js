const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

//create user table
const UserSchema = new mongoose.Schema({
    //the properties here should matche with what you have in your form
    full_Name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('authcollection', UserSchema)