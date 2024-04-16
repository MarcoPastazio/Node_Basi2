//this is a prove for a simple connection for the db using only nodeJS

const { Pool } = require('pg');

//create one pool req
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Music_Store',
  password: 'marcopastore',
  port: 5432,
});

//do an example of query
pool.query('SELECT * FROM album')
  .then(result => console.log(result.rows))
  .catch(err => console.error('Error executing the query', err))
  .finally(() => pool.end());
