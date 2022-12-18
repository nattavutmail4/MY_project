const users = require('../../models/users')
const uploadAvatar = require('../../utils/uploadAvatar')
module.exports = async (req,res)=>{
  users.push(req.body)
  await uploadAvatar(req,users.length)
  res.redirect('/users')
}