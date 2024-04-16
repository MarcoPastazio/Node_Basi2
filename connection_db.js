//this is a prove for a simple connection for the db using only nodeJS

const { Client } = require('pg');

//create the client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Music_Store',
  password: 'marcopastore',
  port: 5432,
});

//the client try to connect with PostgreSQL
client.connect()
  .then(() => console.log('Connected to the PostgreSQL database'))
  .catch(err => console.error('Error while connecting to the database', err));

//do an example of query
client.query('SELECT * FROM album')
  .then(result => console.log(result.rows))
  .catch(err => console.error('Error executing the query', err))
  .finally(() => client.end());
