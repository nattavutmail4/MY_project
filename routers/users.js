const getUserAsTr = require('../utils/getUserAsTr')
const router = require('express').Router()

const  users = [
  {name:"John Doe",age:18},
  {name:"John Dan",age:28},
  {name:"Jane Dee",age:48},
  {name:"Jame Dun",age:38},
]

router.get('/',(req,res)=>{
  res.send(`
    <table>
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th>อายุ</th>
        </tr>
      </thead>
      <tbody>
        ${getUserAsTr(users)}
      </tbody>
    </table>
  `)
})

// app.get('/users/create',(req,res)=>{
//   return res.send(`
//     <form action="/users" method="post">
//       <input type="text" name="name" placeholder="name">
//       <input type="text" name="age" placeholder="age">
//      <button>Submit</button>
//     </form>
//   `)
// })

// app.post('/users',(req,res)=>{
//   users.push(req.body)
//   return res.redirect(`/users/${users.length}`)
// })
// app.get('/users',(req,res)=>{
//   return res.send(users)
// })
// app.get('/users/:id',(req,res)=>{
//     if(Number.isNaN(+req.params.id)){ //แปลงข้อความที่รับมาเป็น number ไหม
//       return res.status(400).send({error:"id is not number"})
//     }
//     if(req.params.id <=0){
//       return res.status(400).send({error:"id is negative or zero"})
//     }

//     const user = users[req.params.id -1] //ค้นหาข้อมูลภายใน users
//     if(!user){
//      return res.status(404).send({error:"Not found"})
//     }
//     if(req.query.type =='text'){
//        return res.status(200).send(` ${user.name}, (${user.age})`)
//     }else{
//       return res.status(200).send(
//           req.query.field ? user[req.query.field] : user
//       )
//     }

// })

module.exports = router
