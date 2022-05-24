const {Pool} = require('pg');

const pool = new Pool ({
  user: 'anthony',
  host: 'localhost',
  database: 'mvp',
  password: '1234',
  port: '5432'
})

module.exports = pool;

