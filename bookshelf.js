require('dotenv').config()
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    charset: 'utf8'
  }
});
var secret = 'gtHnbE34.(fmj35_gh97_mBvTIn'
var bookshelf = require('bookshelf')(knex);



module.exports = bookshelf;
