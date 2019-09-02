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
  
    const populated = await group.populate('members.user', 'name').execPopulate()
  
    res.status(201).json({
      status: 'success',
      data: populated,
    })
  } catch (e) {
    res.json({ status: 'error', message: e.message })
  }

}

exports.fetchGroupInfo = async (req, res) => {
  try {
    const group = await Group.findOne({ _id: req.params.groupId }).populate('createdBy', 'name')
    // console.log(group)
  
    if (!group) {
      return res.staus(404).json({
        status: 'fail',
        message: 'No group found',
      })
    }
  
    res.status(200).json({
      status: 'success',
      data: group,
    })
  } catch (e) {
    res.json({ status: 'error', message: e.message })
  }

}

exports.fetchGroups = async (req, res) => {
  try {
    // throw new Error('test error')
    const groups = await Group.find({ private: false })
    // console.log(groups)
    res.status(200).json({
      status: 'success',
      data: groups,
    })
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      error: e,
    })
  }
  
}
