const users = require("../../models/users")

module.exports = async (req, res) => {
  await users.findByIdAndDelete(req.params.id)
  res.redirect('/users')
}
