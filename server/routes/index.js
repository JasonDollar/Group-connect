const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()

router.get('/api/hello', (req, res) => {
  res.json({
    message: 'hello',
  })
})

router.get('/api/posts', postController.fetchAllPosts)
router.post('/api/posts', postController.createPost)

router.get('/api/posts/:postId', postController.fetchSinglePost)
router.patch('/api/posts/:postId', postController.updatePost)
router.delete('/api/posts/:postId', postController.deletePost)

module.exports = router