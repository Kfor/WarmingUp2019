// Author: K


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

var Deal = sequelize.define('deal_between_list', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    userId1: {
        type:Sequelize.STRING,
        allowNull:false,
    },
    userId2: {
        type:Sequelize.STRING,
        allowNull:false,
    },
    money:{
        type:Sequelize.FLOAT,
        allowNull:false,
    },
    returnMoney:{
        type:Sequelize.FLOAT,
        allowNull:false,
    },
    startTurn:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    endTurn:{    
        type:Sequelize.INTEGER,
        allowNull:false
    },
}, {
    freezeTableName: true, // use singular table name
    timestamps: false
});


/**
 * 同步或更新数据库
 */
function sync() {
    Deal.sync({alter: true});
};

async function destroy() {
    Deal.destroy({where:{}});
};
function push(data) {
    return Deal.create({
        userId1: data.userId1,
        userId2: data.userId2,
        money: data.money,
        returnMoney: data.returnMoney,
        startTurn: data.startTurn,
        endTurn: data.endTurn,
    });
};
async function getAll() {
    return Deal.findAll({
        where:{}
    });
};
async function deleteById(id) {
    return Deal.destroy({
        where:{id:id}
    });
};


module.exports = {sync,destroy,getAll,deleteById,push};