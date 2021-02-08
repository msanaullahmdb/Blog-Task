const mongoose = require('mongoose')
const validator = require('validator')
require('../db/mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }

},{
    timestamps: true
})


const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog