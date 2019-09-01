const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Post content is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post