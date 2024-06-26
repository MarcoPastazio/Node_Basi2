const express = require('express');

//
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const db = require("./models");
const { Customer } = require("./models");

//

const dotenv = require('dotenv');

// get config vars (i don't know if i serve a var variable or const variable)
dotenv.config();


const app = express();
//use the json for send and recieve the date
app.use(express.json());


//with a video
app.post("/register", (req, res) => {
    const { email, password, name, surname } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Customer.create({
        email: email,
        password: hash,
        name: name,
        surname: surname
      })
        .then(() => {
          res.json("USER REGISTERED");
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({ error: err });
          }
        });
    });
});


app.post("/login", (req, res) => {
    res.json("login");
});

app.get("/profile", (req, res) => {
    res.json("profile");
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
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

//generazione del token (login e signin)
//tutto quello che hai fatto con node/express con typescript
