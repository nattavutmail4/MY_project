const { response } = require('express')
const express =require('express') //common (cjs)
const app = express()

app.get('/',(request,response)=>{
  response.send('homepage')
})

app.listen(8080,()=>{
  console.log(`Run server is url http://127.0.0.1:${8080}`)
})