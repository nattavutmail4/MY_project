const express =require('express') //common (cjs)
const morgan = require('morgan')

const users = require('./routers/users')
const index = require('./routers/index')

const port = 8080
const app = express()


app.use(express.urlencoded({extended:false})) //req.body form-encod
app.use(morgan('combined'))
app.use('/',index)
app.use('/users',users)


//การทำ 404
app.use((req,res)=>{
  res.status(404).send(`<h1>ไม่พบหน้าที่เรียกขอ</h1>`)
})


// การทำ next
app.use((err,req,res,next)=>{
  if(res.headersSent){
     return next(err)
  }
  // res.status(500)
  // res.render('error',{error:err})
  // res.status(err.status ?? 500).send({error:err.message})
  res.status(err.status ?? 500).send(`<h1>${err.message ?? 'มีข้อผิดพลาดเกิดขึ้น'}</h1>`)
})

app.listen(port,()=>{
  console.log(`Run server is url http://localhost:${port}`)
})
