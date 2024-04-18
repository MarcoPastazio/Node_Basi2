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

//i import only 2 function about pool
module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
