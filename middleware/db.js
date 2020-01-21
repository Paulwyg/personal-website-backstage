const Sequelize = require('sequelize')
const db = {
    database: 'blog', // 使用哪个数据库
    username: 'root', // 用户名
    password: 'lp1234xy', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
}
const sequelize = new Sequelize(db.database, db.username.db.password, {
    host: db.host,
    dialect: 'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
})
const articles = sequelize.define(
    'articles',
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
            type: Sequelize.STRING,
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

const recentArticles = sequelize.define(
    'recentArticles',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
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
const commonts = sequelize.define(
    'commonts',
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
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        parent:{
            type:Sequelize.STRING,
            allowNull:true,
        }
    },
    {
        timestamps: false
    }
);

module.exports = {
    articles,
    recentArticles,
    commonts
};