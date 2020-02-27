const Router = require('koa-router')
const router = new Router()
const {messages} = require('../middleware/db.js')
router.get('/message',async ctx=>{
    //console.log(ctx.query)
    const allMessages = await messages.findAll();
    //console.log(allCommonts)
    ctx.body=allMessages
})
router.post('/message',async ctx=>{
    // console.log(ctx.cookies.get('user'))
    let oneMessage=ctx.request.body
    if(!ctx.cookies.get('user')){
        ctx.status=401
        ctx.body="请先登录"
        return
    }
    oneMessage.name=ctx.cookies.get('user')
    oneMessage.icon=ctx.cookies.get('icon')
    console.log(oneMessage)
    await messages.create(oneMessage)
    ctx.body="success"
})
module.exports = router