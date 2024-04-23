import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { pool } from "./connection_db";

interface Customer {
    id: number;
    username: string;
    password: string;
}

const app = express();
app.use(express.json());

let refreshTokens: string[] = [];

const generateAccessToken = (customer: Customer): string => {
    return jwt.sign({ id: customer.id, username: customer.username },
        "mySecretKey",
        { expiresIn: "10m" });
}

const generateRefreshToken = (customer: Customer): string => {
    return jwt.sign({ id: customer.id, username: customer.username }, "myRefreshSecretKey");
}

app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM customer WHERE username = $1 AND password = $2', [username, password]);

        if (result.rows.length === 0) {
            return res.status(400).json("Username or password incorrect!");
        }

        const customer: Customer = result.rows[0];

        if (customer) {
            const accessToken = generateAccessToken(customer);
            const refreshToken = generateRefreshToken(customer);
            refreshTokens.push(refreshToken);

            res.json({
                username: customer.username,
                accessToken,
                refreshToken
            });
        } else {
            res.status(400).json("Username or password incorrect!");
        }
    } catch (err) {
        console.error('Query error', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post("/api/refresh", (req: Request, res: Response) => {
    const refreshToken: string = req.body.token;

    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
    }

    jwt.verify(refreshToken, "myRefreshSecretKey", (err: Error | null, customer?: Customer) => {
        if (err) {
            console.error(err);
            return res.status(403).json("Token is not valid!");
        }

        if (!customer) {
            return res.status(403).json("Token is not valid!");
        }

        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        const newAccessToken = generateAccessToken(customer);
        const newRefreshToken = generateRefreshToken(customer);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
});

const verify = (req: Request & { customer?: Customer }, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err: Error | null, customer?: Customer) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }

            req.customer = customer as Customer;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

app.delete("/api/customers/:customerId", verify, (req: Request & { customer?: Customer }, res: Response) => {
    const customerId = parseInt(req.params.customerId);
    if (req.customer && req.customer.id === customerId) {
        res.status(200).json("Customer has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this!");
    }
});

app.post("/api/logout", verify, (req: Request, res: Response) => {
    const refreshToken: string = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
});

app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
});
