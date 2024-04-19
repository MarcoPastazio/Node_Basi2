const express = require('express');
const db = require('./connection_db_express');
//
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { Customer } = require('./customerModel');

//
//const cript = require('crypto').randomBytes(64).toString('hex');
//
const dotenv = require('dotenv');

// get config vars (i don't know if i serve a var variable or const variable)
dotenv.config();

// access config var (i don't know if i serve a var variable or const variable)
//const token_secret = process.env.TOKEN_SECRET;

const app = express();
//use the json for send and recieve the date
app.use(express.json());
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

//with a video
app.post("/register", (req, res) => {
    const { email, password, name, surname } = req.body;
     bcrypt.hash(password, 10).then((hash) => {
        Customer.create({
            email: email,
            password: hash,
            name: name,
            surname: surname
        }).then(() => {
            res.json("customer registrated");
        }).catch((err) => {
            if (err){
                res.status(400).json({ error: err});
            }
        })
     })
    
});

app.post("/login", (req, res) => {
    res.json("login");
});

app.get("/profile", (req, res) => {
    res.json("profile");
});


//before i modified customer's table adding password's attribute (without token)

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

});

process.on('SIGINT', () => {
    console.log('Received SIGINT signal, closing server...');
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal, closing server...');
    process.exit();
});
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


//generazione del token (login e signin)
//tutto quello che hai fatto con node/express con typescript
