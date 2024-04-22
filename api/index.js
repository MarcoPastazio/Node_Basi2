const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
const db = require("./connection_db");

const customers = [
    {
        id: "1",
        username: "John",
        password: "password1",       
    },

    {
        id: "2",
        username: "Jane",
        password: "password2"  
    },
];

let refreshTokens = [];

const generateAccessToken = (customer) => {
    return jwt.sign({ id:customer.id, username: customer.username },
    "mySecretKey",
    { expiresIn: "10m" });
}

const generateRefreshToken = (customer) => {
    return jwt.sign({ id:customer.id, username: customer.username }, "myRefreshSecretKey");
}

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    /*const customer = customers.find(u=>{
        return u.username === username && u.password === password;
    });*/

    try{
        const result = await db.query('SELECT * FROM customer WHERE username = $1 AND password = $2', [username, password]);

        if (result.rows.length === 0) {
            return res.status(400).json("Username or password incorrect!");
        }

        const customer = result.rows[0];


        if(customer){
            //Generate an Access Token
            const acsessToken = generateAccessToken(customer);
            const refreshToken = generateRefreshToken(customer);
            refreshTokens.push(refreshToken);
            
            res.json({
                username:customer.username,
                acsessToken,
                refreshToken
            });
        }else{
            res.status(400).json("Username or password incorrect!");
        }
        

    }catch (err){
        console.error('Query error', err);
        res.status(500).json({ error: 'Server error'});
    }
});


app.post("/api/refresh", (req, res) => {
    //take the refesh token from the user
    const refreshToken = req.body.token;

    //send error if there is no token or it's invalid
    if(!refreshToken) return res.status(401).json("You are not authenticated!");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, customer) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);

        const newAccessToken = generateAccessToken(customer);
        const newRefreshToken = generateRefreshToken(customer);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            acsessToken: newAccessToken,
            refreshToken: newRefreshToken,
        })
    });


    //if everything is ok, create new access token , refresh token and send to user

});

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err, customer) => {
            if(err){
                return res.status(403).json("Token is not valid!");
            }

            req.customer = customer;
            next();
        });
    }else{
        res.status(401).json("you are not authenticated!");
    }
};

app.delete("/api/customers/:customerId", verify, (req, res) => {
    if(req.customer.id === req.params.customerId){
        res.status(200).json("Customer has been deleted.")
    }else{
        res.status(403).json("You are not allowed to delete this!");
    }
});

app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    res.status(200).json("You logged out successfully.")
});

app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});