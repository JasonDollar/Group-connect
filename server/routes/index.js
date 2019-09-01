const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()

router.get('/api/hello', (req, res) => {
  res.json({
    message: 'hello',
  })
})

router.post('/api/posts', postController.createPost)

module.exports = router