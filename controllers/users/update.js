const users = require('../../models/users')
const uploadAvatar = require('../../utils/uploadAvatar')
module.exports = async (req,res)=>{
    users[ req.params.id -1]=req.body
    await uploadAvatar(req,req.params.id)
    res.redirect('/users')
}