const router = require('express').Router()
const users = require('../models/users')

const path = require('path')//libary สำหรับอัพโหลดรูป
const bytes  = require('bytes')
const multer = require('multer')

const upload = multer({
  dest: path.join(__dirname, '../public/uploads'),
  limits: {
    fileSize: bytes('2MB')
  }
})

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
router.get('/',require('../controllers/users/index'))
//2.NEW
router.get('/new',require('../controllers/users/new'))
//3.create
router.post('/',upload.single('avatar'),require('../controllers/users/create'))
//4.show
router.get('/:id',require('../controllers/users/show'))
//5.edit
router.get('/:id/edit',require('../controllers/users/edit'))

//6.update
router.post('/:id/edit',require('../controllers/users/update'))

//7.delete
router.get('/:id/delete',require('../controllers/users/delete'))

module.exports = router
