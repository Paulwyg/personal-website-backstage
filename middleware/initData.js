const {articles,commonts,messages} =require('./db.js')
articles.sync({force:true}).then(()=>{
    return articles.create({
        id: 1,
        stick: true,
        icon: "assets/picture1.jpg",
        label: 'javascript',
        viewers: 200,
        comments: 15,
        date: (new Date(" 2019/12/31 08:00:20")).getTime()/1000,
        title: 'JavaScript中的this详解',
        content: 'this关键字是JavaScript中最复杂的机制之一，掌握了它就掌握了进入JavaScript的魔法，它值得我们付出大量时间去学习'
    })
})
// recentArticles.sync({force:true}).then(()=>{
//     return recentArticles.create({
//         id: 1,
//         title: 'JavaScript中的this详解',
//         content: ''
//     })
// })

commonts.sync({force:true}).then(()=>{
    return commonts.bulkCreate([{
        id:1,
        article_id:1,
        name:'Paulwyg',
        icon:'https://avatars2.githubusercontent.com/u/14348558?v=4',
        date:(new Date(" 2019/09/25 08:00:20")).getTime()/1000,
        content:'测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论',
        parent:null,
    },{
        id:2,
        article_id:1,
        name:'Paulwyg',
        icon:'https://avatars2.githubusercontent.com/u/14348558?v=4',
        date:(new Date(" 2019/09/25 08:00:20")).getTime()/1000,
        content:'回复评论',
        parent:1,
    }])
})

messages.sync({force:true}).then(()=>{
    return messages.bulkCreate([{
        id:1,
        name:'Paulwyg',
        icon:'https://avatars2.githubusercontent.com/u/14348558?v=4',
        date:(new Date(" 2019/09/25 08:00:20")).getTime()/1000,
        content:'留言，踩踩',
        parent:null,
    },{
        id:2,
        name:'Paulwyg',
        icon:'https://avatars2.githubusercontent.com/u/14348558?v=4',
        date:(new Date(" 2019/09/26 08:00:20")).getTime()/1000,
        content:'欢迎欢迎',
        parent:1,
    }])
})