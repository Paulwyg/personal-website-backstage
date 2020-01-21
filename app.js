const Koa=require('koa')
const static=require('koa-static');
const app=new Koa()
const index=require('./routes/index.js')
const users=require('./routes/users.js')
// 跨域
var cors = require('koa2-cors');
app.use(cors());
app.use(index.routes())
app.use(users.routes())
app.use(static(__dirname+'/'));
app.listen(3000,()=>{
    console.log('3000端口已启动')
})
