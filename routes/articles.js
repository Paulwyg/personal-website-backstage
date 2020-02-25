const Router=require('koa-router')
const router=new Router()
const {articles} =require('../middleware/db.js')
router.get('/allArticles',async ctx=>{
    const allArticles=await articles.findAll()
    ctx.body=allArticles
})
module.exports=router