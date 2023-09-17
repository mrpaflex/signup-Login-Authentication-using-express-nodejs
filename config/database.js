const mongoose = require('mongoose')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('connsected to db')
    } catch (errors) {
        console.log(errors)
    }
}

module.exports = connectDB