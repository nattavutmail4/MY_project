module.exports = (req, res) => {
  res.render('users-new', { user: res.locals.user, id: req.params.id })
}
