const express = require("express"); //common (cjs)
const morgan = require("morgan");
const path = require("path");
const users = require("./routers/users");
const index = require("./routers/index");
const client = require("./mongodb/client"); //import client มาใช้

async function startService() {

  await client.connect(); //รอการเชื่อมต่อmongodb ว่าได้ไหมถ้าไม่ได้มันจะรันผ่านแต่เรียกใช้งานไม่ได้
  const port = 8080;
  const app = express();

  app.set("x-powered-by", false);

  //ใช้สำหรับพวก ejs pug เป็นต้นกรณีที่ไม่ใช้ fontend vuejs reactjs
  app.set("view engine", "pug"); // res.render <= pug
  app.set("views", path.join(__dirname, "./views")); // set path res.render <=path /

  app.use(express.static(path.join(__dirname, "./public"))); // settig path

  app.use(express.urlencoded({ extended: false })); //req.body form-encod
  // app.use(morgan('combined'))

  //setting routting
  app.use("/", index);
  app.use("/users", users);

  //การทำ 404
  app.use((req, res) => {
    res.status(404).send(`<h1>ไม่พบหน้าที่เรียกขอ</h1>`);
  });

  // การทำ next
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    // res.status(500)
    // res.render('error',{error:err})
    // res.status(err.status ?? 500).send({error:err.message})
    res
      .status(err.status ?? 500)
      .send(`<h1>${err.message ?? "มีข้อผิดพลาดเกิดขึ้น"}</h1>`);
  });

  //create server
  app.listen(port, () => {
    console.log(`Run server is url http://localhost:${port}`);
  });
}
startService()