const users = require("../../models/users")

module.exports = async (req, res, next) => {
  const usersData = await users.find().populate('recordCount')
  res.render('users', { users: usersData })
}
