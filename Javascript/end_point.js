//this is an example where i create my first end point with node and express. Let's go

const express = require('express');

const app = express();

//i do a get and the response is a basic HELLO WORLD
app.get("/", (req,res) => {
    res.send("Hello World");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`);
});

//i set the port for the comunication e after the server listen on port 3000 (for my example)
/*
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/



//this is an example to create a end point with node
/*
const http = require('http');

const server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hello World!");
  res.end();
}).listen(3000);
*/




//in api.js prima di introdurre i token:
//before i modified customer's table adding password's attribute (without token)
/*
app.get('/', (req, res) => {
  res.send('Welcome');
});


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
      const {email, password, name, surname} = req.body;

      const checkQueryText = 'SELECT * FROM customer WHERE email = $1';
      const checkQueryValues = [email];
      const checkResult = await db.query(checkQueryText, checkQueryValues);

      if(checkResult.rows.length > 0){
          res.status(409).json({error: 'Element already exists'});
      }else{
          const queryText = 'INSERT INTO customer (email, password, name, surname) values ($1, $2, $3, $4) RETURNING *';
          const values = [email, password, name, surname];
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

      const {email, password, name, surname} = req.body;
      const queryText = `UPDATE customer SET email = $1, password = $2, name = $3, surname $4 WHERE email = $4 RETURNING *`;
      //In the PUT request, we also need to include the values for the WHERE clause in the values array.
      const values = [email, password, name, surname, customerEmail];
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

});*/

//una prova fatta con una guida
/*
//
function generateAccessToken(email) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

//
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, token_secret, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            } else {
                return res.status(403).json({ error: 'Invalid token' });
            }
        }

        req.user = user;
        next();
    });
}*/