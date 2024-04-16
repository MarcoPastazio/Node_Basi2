//this is a prove for a simple connection for the db

const { Client } = require('pg');


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Music_Store',
  password: 'marcopastore',
  port: 5432,
});


client.connect()
  .then(() => console.log('Connesso al database PostgreSQL'))
  .catch(err => console.error('Errore durante la connessione al database', err));


client.query('SELECT * FROM album')
  .then(result => console.log(result.rows))
  .catch(err => console.error('Errore durante l\'esecuzione della query', err))
  .finally(() => client.end());
