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

var Round = sequelize.define('round', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        defaultValue:1,
    },
    round: {
        type:Sequelize.INTEGER,
        defaultValue:1,
    }
}, {
    freezeTableName: true, // use singular table name
    timestamps: false
});


/**
 * 同步或更新数据库
 */
function sync() {
    Round.sync({alter: true});
};
function init() {
    return Round.create({
        id:1,
        round:1,
    })
};

function getRound() {
    return Round.findOne({
        where:{}
    });
};
async function nextRound() {
    const round = await Round.findOne({where:{id:1}});
    console.log('-------------nextR',round.dataValues.round)
    return Round.update({
        round:Number(round.dataValues.round)+1
    },{
        where:{id:1}
    });
};

async function destroy() {
    Round.destroy({where:{}});
};
module.exports = {sync,getRound,nextRound,init,destroy};