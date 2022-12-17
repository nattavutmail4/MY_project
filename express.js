const { response } = require('express')
const express =require('express') //common (cjs)
const morgan = require('morgan')

const port = 8080
const app = express()

app.use(express.urlencoded({extended:false})) //req.body form-encod
app.use(morgan('combined'))
// app.use(express.json()) // req.body.json
//ตัวอย่างการทำmiddleware
const shouldBeLoggedIn = (req,res,next)=>{
  if(req.get('X-Login-Token') != '1234'){
     return next(new Error('Not Logged in'))
  }
  return next()
}

//เอา middleware ไปใช้ทั้ง app
// app.use(shouldBeLoggedIn)

//ดัก middleware บาง function
// app.get('/',shouldBeLoggedIn,(req,res)=>{
//   res.format({
//     'text/html':()=>{
//       res.send('<h1>Hello World</h1>')
//     },
//     'text/plain':()=>{
//       res.set('Content-Type','text/plain')
//       res.send('<h1>Hello World</h1>')
//     },
//     'application/json':()=>{
//       res.send({text:'hello world'})
//     },
//     default:()=>{
//       res.status(400).send('Content-Type not allow')
//     }
//   })
// })


const  users = [
  {name:"John Doe",age:18},
  {name:"John Dan",age:28},
  {name:"Jane Dee",age:48},
  {name:"Jame Dun",age:38},
]



app.get('/users/create',(req,res)=>{
  return res.send(`
    <form action="/users" method="post">
      <input type="text" name="name" placeholder="name">
      <input type="text" name="age" placeholder="age">
     <button>Submit</button>
    </form>
  `)
})
app.post('/users',(req,res)=>{
  users.push(req.body)
  return res.redirect(`/users/${users.length}`)
})
app.get('/users',(req,res)=>{
  return res.send(users)
})
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
//end



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


 //การทำ middleware handle error
app.get('/test-login',(req,res,next)=>{
  const token = req.get('X-Login-Token')
  if(!token){
    const err = new Error('X-Login-Token not found')
    err.status = 401
    return next(err)
  }
  if(token != '1234'){
    const err = new Error('X-Login-Token is mismatch')
    err.status = 403
    return next(err)
  }
  next()
},(req,res)=>{
  res.send(users)
})

//404
app.use((req,res)=>{
  res.status(404).send({error:"Not"})
})

// การทำ error
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

