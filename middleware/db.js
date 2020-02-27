const Sequelize = require('sequelize')
const db = {
    database: 'blog', // 使用哪个数据库
    username: 'root', // 用户名
    password: 'lp1234xy', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
}
const sequelize = new Sequelize(db.database, db.username,db.password, {
    host: db.host,
    dialect: 'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    //解决中文输入问题
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
    }
})

// 测试连接是否成功
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.log('Unable to connect to the database', err)
    })

const articles = sequelize.define(
    'article',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        stick: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        label: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        viewers: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        comments: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false
    }
);

// const recentArticles = sequelize.define(
//     'recentArticle',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             allowNull: true,
//             autoIncrement: true
//         },
//         title: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         content: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         timestamps: false
//     }
// );
const commonts = sequelize.define(
    'commont',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        article_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        parent:{
            type:Sequelize.INTEGER,
            allowNull:true,
        }
    },
    {
        timestamps: false
    }
);

const messages=sequelize.define(
    'message',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        parent:{
            type:Sequelize.INTEGER,
            allowNull:true,
        }
    },
    {
        timestamps: false
    }
)

// 根据 model自动创建表
// sequelize
//     .sync()
//     .then(() => {
//         console.log('init db ok')
//     })
//     .catch(err => {
//         console.log('init db error', err)
//     })

module.exports = {
    articles,
    commonts,
    messages
};