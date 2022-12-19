module.exports = (req, res) => {
  res.render('users-show', { user: res.locals.user, id: req.params.id })
}
