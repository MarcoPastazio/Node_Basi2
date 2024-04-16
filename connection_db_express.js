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

app.use(express.json());

app.get('/', (req, res) => {
  pool.query('SELECT * FROM album')
    .then(result => res.json(result.rows))
    .catch(err => res.status(500).json({ error: 'Errore durante l\'esecuzione della query' }));
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
