//CJS
module.exports = (users)=>{
  let html = ''
  let i = 0
  for(const user of users) //loop data users
  {
     i++
     html+= '<tr>',
     html+= '<td>'+user.name+'</td>',
     html+= '<td>'+user.age+'</td>',
     html+= '<td>'
     html+= `<a href="/users/${i}">ดูข้อมูล</a> ${i} `,
     html+= `<a href="/users/${i}/edit">แก้ไขข้อมูล</a> `,
     html+= `<a href="/users/${i}/delete" onclick="return confirm('คุณแน่ใจที่จะลบข้อมูล')">ลบ</a>`,
     html+='</td>',
     html+= '</tr>'
  }
  return  html

}
