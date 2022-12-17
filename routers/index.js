const router = require('express').Router()

router.get('/',(req,res)=>{
  return res.send(`<h1><a href='/users'>ดูรายชื่อผู้ใช้งาน</a></h1>`)
})

module.exports = router
