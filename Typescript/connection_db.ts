const http  = require('http');
const { Pool } = require('pg');

//create one pool req
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'music_store',
  password: 'marcopastore',
  port: 5432,
});

