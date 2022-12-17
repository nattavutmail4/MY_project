const { response } = require('express')
const express =require('express') //common (cjs)
const port = 8080
const app = express()


app.get('/',(request,response)=>{
  response.send('homepage')
})

app.get('/ping',(request,response)=>{
  response.send('pong')
})

app.listen(port,()=>{
  console.log(`Run server is url http://127.0.0.1:${port}`)
})