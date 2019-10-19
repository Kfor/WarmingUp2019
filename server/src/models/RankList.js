
const Sequelize = require('sequelize')
const config = require('../config.js')


var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect, 
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        idle: config.pool.idle
    },
    timezone: config.timezone
});

var Rank = sequelize.define('rank_list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: true
    },
    totalStorageCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

    currency: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 10000000
    },
    
    loan: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    loanMax: {
        type:Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }

}, {
    freezeTableName: true, // use singular table name
    timestamps: false
});


/**
 * 同步或更新数据库
 */
function sync() {
    Rank.sync({alter: true});
};

/**
 * 添加用户
 */
function addRankItem(userId) {
    return Rank.create({
            userId: userId
        })
};

async function update(list) {
    for(let i in list) {
        var data = list[i];
        Rank.update({
            totalStorageCost: data.totalStorageCost,
            currency: data.currency,
            loan: data.loan,
            loanMax: data.loanMax,
            rank: data.rank,
        },{
            where:{userId:data.userId}
        });
    }
};

async function findAll() {
    return Rank.findAll();
}

async function destroy() {
    Rank.destroy({where:{}});
};

module.exports = {sync,addRankItem,update,destroy,findAll}