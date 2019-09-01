const Post = require('../models/Post')

exports.createPost = async (req, res) => {
  console.log(req.body)
  const post = await new Post(req.body).save()

  res.json({
    message: 'success',
    data: post,
  })
}