module.exports =(users)=> (req,res,next)=>{
  res.locals.user = users[req.params.id -1]  //global scope
  if(!res.locals.user){
    const err = new Error('ไม่พบข้อมูลผู้ใช้')
    err.status= 404
    return next(err)
  }
  return next()
}
