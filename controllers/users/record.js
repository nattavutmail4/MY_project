const records = require('../../models/records')

module.exports = async (req, res) => {
  await records.create({
    user: req.params.id,
    note: req.body.note
  })
  res.redirect('/users')
}
