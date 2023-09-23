const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    authorName: String,
    title: String,
    body: String,
    likeCount: Number,
    comment: String,
    userId: String
})

module.exports = mongoose.model('post', PostSchema)