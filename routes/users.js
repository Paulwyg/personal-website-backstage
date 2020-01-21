const Router=require('koa-router')
const axios=require('axios');
const querystring=require('querystring');
const router=new Router()
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");
const secret = "it's a secret";

const config={
    client_id:'a40d545f729108175d8f',
    client_secret:'c4e662deba4e7bdef509389fbcf8ad680f73c0ce'
};
router.get('/github/login',async (ctx)=>{
    var dataStr=(new Date()).valueOf();
    //重定向到认证接口,并配置参数
    var path="https://github.com/login/oauth/authorize";
    path+='?client_id='+config.client_id;
    //转发到授权服务器
    ctx.body=path;
    // ctx.redirect(path)
});
router.get('/github/callback',async (ctx)=>{
    console.log('callback...')
    const code=ctx.query.code;
    const params={
        client_id:config.client_id,
        client_secret: config.client_secret,
        code:code
    }
    let res=await axios.post('https://github.com/login/oauth/access_token', params)
    const access_token=querystring.parse(res.data).access_token
    console.log(access_token)
    res=await axios.get('https://api.github.com/user?access_token=' + access_token)
    // console.log('userAccess:', res.data)
     // ctx.body = res.data
    ctx.cookies.set('user',res.data.login)
    ctx.cookies.set('icon',res.data.avatar_url)
    ctx.redirect('http://localhost:8080/')
})
module.exports=router