// const getUserAsTr = require('../utils/getUserAsTr')
const multer = require('multer')
const path = require('path') //libary สำหรับอัพโหลดรูป
const sharp = require('sharp')
const router = require('express').Router()

// const storage = multer.diskStorage({
//   destination (req,file,next){
//      next(null,path.join(__dirname,'../public/uploads'))
//   },
//   filename (req,file,next){
//      next(null,file.originalname)
//   }
// })
// const upload = multer({
//   storage:storage
// })

const upload = multer({
   dest:path.join(__dirname,'../public/uploads') //เข้าถึงตำแหน่งโฟลเดอร์ที่ต้องการอัพไฟล์
})

const  users = [
  {name:"John Doe",age:18},
  {name:"John Dan",age:28},
  {name:"Jane Dee",age:48},
  {name:"Jame Dun",age:38},
]

// middlewares
router.param('id',(req,res,next,id)=>{
   res.locals.user = users[id-1] //locals เก็บข้อมูลเป็นgloble
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
  res.render('users',{users})
})

//2.NEW
router.get('/new',(req,res)=>{
  res.render('users-new',{users})
})

//3.create
router.post('/',upload.single('avatar'),async(req,res)=>{
  await sharp(req.file.path)
    .resize(200,200) //บังคับปรับขนาดรูปเป็น 200 * 200
    .jpeg({quality:100}) //ลดคุณภาพรูปให้เป็น70
    .toFile(path.join(__dirname,`../public/uploads/${Math.round(Math.random()*1E9)}.jpg`))
    
  console.log(req.body); //เกิดจากการinputเข้ามา
  console.log(req.file); //เกิดจากการอัพรูป
  users.push(req.body)
  res.redirect('/users')
})

//4.show
router.get('/:id',(req,res)=>{
  //  return res.send(`<h1>ชื่อ: ${res.locals.user.name}  อายุ: ${res.locals.user.age}</h1>`)
  res.render('users-new',{user:res.locals.user,id:req.params.id})
})

//5.edit
router.get('/:id/edit',(req,res)=>{
  // users[ req.params.id -1]=req.body
  // res.redirect('/users')
  res.render('users-new',{user:res.locals.user,id:req.params.id})

})

//6.update
router.post('/:id/edit',(req,res)=>{
 console.log(req.body);
 users[ req.params.id -1]=req.body
 res.redirect('/users')
})

//7.delete
router.get('/:id/delete',(req,res)=>{
  users.splice(req.params.id -1,1) // splice ใช้สำหรับลบข้อมูล
  res.redirect('/users')

})
module.exports = router
