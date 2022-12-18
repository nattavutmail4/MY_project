const users = require("../../models/users")
module.exports = (req,res)=>{
  users.splice(req.params.id -1,1) // splice ใช้สำหรับลบข้อมูล
  res.redirect('/users')
}