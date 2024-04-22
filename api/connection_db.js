//this is a prove for a simple connection for the db using only nodeJS

const http  = require('http');
const { Pool } = require('pg');

//create one pool req
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'music_store',
  password: 'marcopastore',
  port: 5432,
});

module.exports = pool;

//i create a HTTP-server
/*
const server = http.createServer((req, res) => {
  //do an example of query
  pool.query('SELECT * FROM album')
  .then(result => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result.rows));
  })
  .catch(err => {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Query error');
  });
});
*/
/*
const port = 3002;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/
