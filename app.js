const Koa=require('koa')
const static=require('koa-static');
const app=new Koa()
const index=require('./routes/index.js')
const users=require('./routes/users.js')
const articles=require('./routes/articles.js')
// 跨域
var cors = require('koa2-cors');
app.use(cors());

//处理post传过来的数据
const bodyparser = require('koa-bodyparser')
app.use(bodyparser())

app.use(index.routes())
app.use(users.routes())
app.use(articles.routes())
app.use(static(__dirname+'/'));
app.listen(3000,()=>{
    console.log('3000端口已启动')
})
