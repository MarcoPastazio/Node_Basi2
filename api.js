const express = require('express');
const db = require('./database');

const app = express()


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
    console.log(`Server is running on ${PORT}`);
  });
