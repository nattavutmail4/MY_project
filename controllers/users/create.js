const users = require('../../models/users')
const uploadAvatar = require('../../utils/uploadAvatar')

module.exports = async (req, res) => {
  const doc = await users.create(req.body)
  const avatar = await uploadAvatar(req, doc._id)
  if (avatar) {
    doc.avatar = avatar
    await doc.save()
  }
  res.redirect('/users')
}
