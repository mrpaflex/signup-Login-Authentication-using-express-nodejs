const mongoose = require('mongoose')

//create user table
const UserSchema = new mongoose.Schema({
    //the properties here should matche with what you have in your form
    full_Name: String,
    
    username: String,

    email: String,
    
    password: String,
    
    gender: String,
    
    address: String,

    dob:  String,

    phone: Number
})

module.exports = mongoose.model('authcollection', UserSchema)