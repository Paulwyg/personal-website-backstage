const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()
const {commonts} = require('../middleware/db.js')
router.post('/articles', async ctx => {
    const article_id=ctx.request.body.id
    const pathUrl = await path.join(__dirname, `../md/${article_id}.md`)
    ctx.body = fs.createReadStream(pathUrl)
})
router.get('/commonts',async ctx=>{
    //console.log(ctx.query)
    const article_id=parseInt(ctx.query.id)
    const allCommonts = await commonts.findAll({
        where: {
            article_id
        }
    });
    //console.log(allCommonts)
    ctx.body=allCommonts
})
router.post('/commonts',async ctx=>{
    // console.log(ctx.cookies.get('user'))
    let oneCommonts=ctx.request.body
    if(!ctx.cookies.get('user')){
        ctx.status=401
        ctx.body="请先登录"
        return
    }
    oneCommonts.name=ctx.cookies.get('user')
    oneCommonts.icon=ctx.cookies.get('icon')
    console.log(oneCommonts)
    await commonts.create(oneCommonts)
    ctx.body="success"
})
module.exports = router