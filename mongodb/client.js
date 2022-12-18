const  { MongoClient} = require('mongodb')

const uri = 'mongodb://127.0.0.1' //urlที่ใช้สำหรับเชื่อม mongodb
const client = new MongoClient(uri) //เรียกใช้งานคราส mongodb พร้อมสง uri


module.exports = client // export module client