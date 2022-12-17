const { response } = require('express')
const express =require('express') //common (cjs)

const port = 8080
const app = express()




app.get('/',(req,res)=>{
  res.format({
    'text/html':()=>{
      res.send('<h1>Hello World</h1>')
    },
    'text/plain':()=>{
      res.set('Content-Type','text/plain')
      res.send('<h1>Hello World</h1>')
    },
    'application/json':()=>{
      res.send({text:'hello world'})
    },
    default:()=>{
      res.status(400).send('Content-Type not allow')
    }
  })
})


const  users = [
  {name:"John Doe",age:18},
  {name:"John Dan",age:28},
  {name:"Jane Dee",age:48},
  {name:"Jame Dun",age:38},
]

app.get('/users/:id',(req,res)=>{
    if(Number.isNaN(+req.params.id)){ //แปลงข้อความที่รับมาเป็น number ไหม
      return res.status(400).send({error:"id is not number"})
    }
    if(req.params.id <=0){
      return res.status(400).send({error:"id is negative or zero"})
    }

    const user = users[req.params.id -1] //ค้นหาข้อมูลภายใน users
    if(!user){
     return res.status(404).send({error:"Not found"})
    }
    if(req.query.type =='text'){
       return res.status(200).send(` ${user.name}, (${user.age})`)
    }else{
      return res.status(200).send(
          req.query.field ? user[req.query.field] : user
      )
    }

})


app.get('/dowload',(req,res)=>{
   res.download('./img/christmas.jpg','chirstmas.png') //สำหรับดาวโหลดไฟล์ และเปลี่ยนนามสกุลไฟล์
  // res.send('ok!')
})
app.get('/google',(req,res)=>{
  res.redirect(301,'https://www.google.com') // redirect ไปยังหน้าอื่นๆ
})

app.get('/notfound',(req,res)=>{
  res.status(404).send('notfound')
})

app.get('/notallow',(req,res)=>{
  res.status('403').send('ไม่อนุญาติ')
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
