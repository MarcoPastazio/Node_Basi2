//this is an example where i create my first end point with node and express. Let's go

import express from 'express';

const app = express();

//i do a get and the response is a basic HELLO WORLD
app.get("/", (req,res) => {
    res.send("Hello World");
});

//i set the port for the comunication e after the server listen on port 3000 (for my example)
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



//this is an example to create a end point with node
/*
const http = require('http');

const server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(uc.upperCase("Hello World!"));
  res.end();
}).listen(3000);
*/