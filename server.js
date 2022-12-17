const express =require('express') //common (cjs)

const users = require('./routers/users')
const index = require('./routers/index')

const port = 8080
const app = express()


app.use(express.urlencoded({extended:false})) //req.body form-encod

app.use('/',index)
app.use('/users',users)


//การทำ 404
app.use((req,res)=>{
  res.status(404).send({error:"Not found"})
})


// การทำ next
app.use((err,req,res,next)=>{
  if(res.headersSent){
     return next(err)
  }
  // res.status(500)
  // res.render('error',{error:err})
  res.status(err.status ?? 500).send({error:err.message})
})

app.listen(port,()=>{
  console.log(`Run server is url http://localhost:${port}`)
})
