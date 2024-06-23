require('dotenv').config()
// this is important!
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {require: true}
        },
        logQueryParameters: true,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        logQueryParameters: true,
    },
}
