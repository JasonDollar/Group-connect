const Group = require('../models/Group')

exports.createGroup = async (req, res) => {
  const group = await Group.create({
    name: req.body.name,
    createdBy: req.user._id,
    private: req.body.private ? req.body.private : false,
    members: [{
      user: req.user._id,
      role: 'admin',
    }],
  })

  const populated = await group.populate({
    path: 'createdBy',
    select: 'name',
  }).populate('members.user', 'name').execPopulate()

  res.status(201).json({
    message: 'success',
    data: populated,
  })
}