const Group = require('../models/Group')

exports.createGroup = async (req, res) => {
  try {
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
  } catch (e) {
    res.json({ message: e.message })
  }

}

exports.fetchGroupInfo = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('createdBy', 'name')
    console.log(group)
  
    if (!group) {
      res.staus(404).json({
        message: 'fail',
      })
    }
  
    res.status(200).json({
      message: 'success',
      data: group,
    })
  } catch (e) {
    res.json({ message: 'fail' })
  }

}