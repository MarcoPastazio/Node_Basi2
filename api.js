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

app.post('/api/addcustomer', async (req, res) => {
    try{
        const {email, name, surname} = req.body;

        const checkQueryText = 'SELECT * FROM customer WHERE email = $1';
        const checkQueryValues = [email];
        const checkResult = await db.query(checkQueryText, checkQueryValues);

        if(checkResult.rows.length > 0){
            res.status(409).json({error: 'Element already exists'});
        }else{
            const queryText = 'INSERT INTO customer (email, name, surname) values ($1, $2, $3) RETURNING *';
            const values = [email, name, surname];
            const result = await db.query(queryText, values);

            res.json(result.rows[0]);
        }
    }catch (err){
        console.error('Error for the Post request:', err);
        res.status(500).json({error: 'Error for the Post request'});
    }
});

app.put('/api/updatecustomer/:email', async (req, res) => {
    try{
        const customerEmail = req.params.email;

        const {email, name, surname} = req.body;
        const queryText = `UPDATE customer SET email = $1, name = $2, surname = $3 WHERE email = $4 RETURNING *`;
        //In the PUT request, we also need to include the values for the WHERE clause in the values array.
        const values = [email, name, surname, customerEmail];
        const result = await db.query(queryText, values);
        
        
        if(result.rows.length === 0){
            res.status(404).json({error: 'Element not found'});
        }else{
            res.json(result.rows[0]);
        }
        
    }catch (err){
        console.error('Error for the Put request', err);
        res.status(500).json({error: 'Error for the Put request'});
    }
});

app.delete('/api/deletecustomer/:email', async (req, res) => {
    try{
        const customerEmail = req.params.email;

        const checkQueryText = 'SELECT * FROM customer WHERE email = $1';
        const checkQueryValues = [customerEmail];
        const checkResult = await db.query(checkQueryText, checkQueryValues);

        if(checkResult.rows.length === 0){
            res.status(404).json({error: 'element not found'});
        }else{
            const query = 'DELETE FROM customer WHERE email = $1';
            const values = [customerEmail];
            const result = await db.query(query,values);

            res.json({message: 'Element deleted successfully'});
        }
    }catch(err){
        console.error('Error for the Delete operation', err);
        res.status(500).json({error: 'Error for the Delete operation'});
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


//generazione del token (login e signin)
//tutto quello che hai fatto con node/express con typescript
