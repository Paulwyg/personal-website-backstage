const Router=require('koa-router')
const fs=require('fs')
const path=require('path')
const router=new Router()
router.get('/articles',ctx=>{
    const pathUrl=path.join(__dirname,'../this.md')
    ctx.body=fs.createReadStream(pathUrl)
})
module.exports=router