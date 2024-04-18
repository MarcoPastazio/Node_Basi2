const express = require('express');
const db = require('./connection_db_express');

const app = express()

//use the json for send and recieve the date
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.get('/api/customers', async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM customer');
        res.json(result.rows);
    }catch (err){
        console.error('Query error', err);
        res.status(500).json({ error: 'Server error'});
    }
});


process.on('SIGINT', () => {
    db.end()
      .then(() => {
        console.log('Disconnection...');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Disconnection error:', err);
        process.exit(1);
      });
});
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
