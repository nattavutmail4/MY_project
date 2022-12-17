const getUserAsTr = require('../utils/getUserAsTr')
const router = require('express').Router()
const pug = require('pug')
const  users = [
  {name:"John Doe",age:18},
  {name:"John Dan",age:28},
  {name:"Jane Dee",age:48},
  {name:"Jame Dun",age:38},
]

router.param('id',(req,res,next,id)=>{
   res.locals.user = users[id-1]
   if(!res.locals.user){
      const err = new Error('ไม่พบข้อมูล')
      err.status=404
      return next(err)
   }
   return next()
})
// 7 RESTFULL' ROUTING
//1. get
router.get('/',(req,res)=>{
  res.render('users')
  // res.send(`<a href='/users/new'>เพิ่มสมาชิก</a>
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>ชื่อ</th>
  //         <th>อายุ</th>
  //         <th>จัดการข้อมูล</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       ${getUserAsTr(users)}
  //     </tbody>
  //   </table>
  // `)
})

//2.NEW
router.get('/new',(req,res)=>{
  res.send(`
     <form action='/users' method='POST'>
      <input type="text" name="name" placeholder="name">
      <input type="text" name="age" placeholder="age">
      <button>เพิ่มข้อมูล</button>
     </form>
  `)
})
//3.create
router.post('/',(req,res)=>{
  users.push(req.body)
  res.redirect('/users')
})

//4.show
router.get('/:id',(req,res)=>{
   return res.send(`<h1>ชื่อ: ${res.locals.user.name}  อายุ: ${res.locals.user.age}</h1>`)
})

//5.edit
router.get('/:id/edit',(req,res)=>{
  return res.send(`
    <form action='/users/${req.params.id}/edit' method='POST'>
      <input type="text" name="name" placeholder="name" value="${res.locals.user.name}">
      <input type="text" name="age" placeholder="age"value="${res.locals.user.age}">
      <button>แก้ไข</button>
    </form>
  `)
})

//6.update
router.post('/:id/edit',(req,res)=>{
 users[ req.params.id -1]=req.body
 res.redirect('/users')
})

//7.delete
router.get('/:id/delete',(req,res)=>{
  users.splice(req.params.id -1,1) // splice ใช้สำหรับลบข้อมูล
  res.redirect('/users')

})
module.exports = router
