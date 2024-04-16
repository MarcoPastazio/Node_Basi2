////this is a prove for a simple connection for the db using node and express


const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Music_Store',
  password: 'marcopastore',
  port: 5432,
});

//use the json for send and recieve the date
app.use(express.json());

//do a get request
app.get('/', (req, res) => {
  pool.query('SELECT * FROM album')
    .then(result => res.json(result.rows))
    .catch(err => res.status(500).json({ error: 'Error executing the query' }));
});

//the server is listening
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
