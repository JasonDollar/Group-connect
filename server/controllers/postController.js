const Post = require('../models/Post')

exports.fetchSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.postId)
  res.status(200).json({
    message: 'success',
    data: post,
  })
}

exports.createPost = async (req, res) => {
  const post = await new Post({
    ...req.body,
    createdBy: req.user._id,
  }).save()

  await post.populate('createdBy', 'name').execPopulate()

  res.status(201).json({
    message: 'success',
    data: post,
  })
}

exports.updatePost = async (req, res) => {
  const updatedPost = await Post.findOneAndUpdate({ _id: req.params.postId, createdBy: req.user._id }, req.body, { new: true })

  res.status(200).json({
    message: 'success',
    data: updatedPost,
  })
}

exports.deletePost = async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.postId, createdBy: req.user._id })

  res.status(204).json({
    message: 'success',
    data: null,
  })
}

exports.fetchAllPosts = async (req, res) => {
  const posts = await Post.find()
  res.status(200).json({
    message: 'success',
    data: posts,
  })
}