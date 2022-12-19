const express = require('express')
const path = require('path')
const multer = require('multer')
const bytes = require('bytes')
const router = express.Router()

const upload = multer({
  dest: path.join(__dirname, '../public/uploads'),
  limits: {
    fileSize: bytes('2MB')
  }
})

router.param('id', require('../controllers/users/paramId'))

router.get('/', require('../controllers/users/index'))
router.get('/new', require('../controllers/users/new'))
router.post('/', upload.single('avatar'), require('../controllers/users/create'))
router.get('/:id', require('../controllers/users/show'))
router.get('/:id/edit', require('../controllers/users/edit'))
router.post('/:id/edit', upload.single('avatar'), require('../controllers/users/update'))
router.get('/:id/delete', require('../controllers/users/delete'))
router.post('/:id/record', require('../controllers/users/record'))

module.exports = router
