//CJS
module.exports = (users)=>{
  let html = ''

  for(const user of users) //loop data users
  {
     html+= '<tr>',
     html+= '<td>'+user.name+'</td>',
     html+= '<td>'+user.age+'</td>',
     html+= '</tr>'
  }
  return  html

}
