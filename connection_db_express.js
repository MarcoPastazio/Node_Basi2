//this is a prove for a simple connection for the db using node and express


const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const port = process.env.port || 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'music_store',
  password: 'marcopastore',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Connection error', err);
  process.exit(-1);
})

//use the json for send and recieve the date
app.use(express.json());

//do a get request
/*
app.get('/', (req, res) => {
  pool.query('SELECT * FROM album')
    .then(result => res.json(result.rows))
    .catch(err => res.status(500).json({ error: 'Error executing the query' }));
});
*/



module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
