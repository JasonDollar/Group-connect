const Group = require('../models/Group')
const { decodeHashId } = require('../lib/hashid')

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
    const groupId = decodeHashId(req.params.groupId)
    const group = await Group.findOne({ _id: groupId }).populate('createdBy', 'name')
    const isMember = group.members.find(item => item.user === req.user._id)
    console.log(group.members[0].user, req.user._id)
    console.log(group.members[0].user.toString() === req.user._id.toString())
  
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
