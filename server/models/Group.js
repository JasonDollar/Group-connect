const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Group name must be unique'],
    required: [true, 'Group name is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Group has to have a creator'],
  },
  private: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['admin', 'moderator', 'user'],
        default: 'user',
      },
    },
  ],
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group