const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    author: {
        type: String,
        minlength: 5,
        required: true,
    },
    url: {
        type: String,
        minlength: 10,
        required: true
    },
    likes: {
        type: Number,
        minlength: 1,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        text: String,
        ref: 'Comment'
      },
    ]
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
