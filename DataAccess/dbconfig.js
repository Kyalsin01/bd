const {Sequelize} =require('sequelize');

const database = new Sequelize('postgresql://neondb_owner:npg_GM3bUzalniv7@ep-empty-heart-bdzqwl17-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require', {
    dialect:'postgres',
    ssl:{
        require: true,
        rejectUnauthorized: false
    },
})
//postgresql://neondb_owner:npg_RcATyo4x6HUJ@ep-quiet-mud-bdq148r0-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
module.exports = database