const { response } = require('express')
const express =require('express') //common (cjs)
const port = 8080
const app = express()


app.get('/',(req,res)=>{
  res.send('homepage')
})

app.get('/ping',(req,res)=>{
  res.send('pong')
})

app.get('/abc',(req,res)=>{
  res.send('def')
})

app.listen(port,()=>{
  console.log(`Run server is url http://localhost:${port}`)
})