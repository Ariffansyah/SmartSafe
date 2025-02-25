import express from 'express';
import cors from 'cors';
import { db_accounts } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function accounts() {
    const app = express();
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('JWT_SECRET not found in .env file');
        process.exit(1);
    }

    app.use(cors());
    app.use(express.json());

    app.post('/api/register', async (req, res) => {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            res.status(400).json({ success: false, message: 'please provide all fields' });
            return;
        }

        try {
            const checkemail = await db_accounts.query('select * from accounts where email = $1', [email]);
            if (checkemail.rows.length > 0) {
                res.status(400).json({ success: false, message: 'email already exists' });
                return;
            }

            const checkusername = await db_accounts.query('select * from accounts where username = $1', [username]);

            if (checkusername.rows.length > 0) {
                res.status(400).json({ success: false, message: 'username already exists' });
                return;
            }

            const bycrptpassword = await bcrypt.hash(password, 10);

            const newaccount = await db_accounts.query(
                'insert into accounts (email, username, password) values($1, $2, $3) returning *',
                [email, username, bycrptpassword]
            );
            res.status(201).json({ success: true, message: 'account created successfully', data: newaccount.rows[0] });
        } catch (error) {
            console.error('error inserting: ' + error);
            res.status(500).json({ success: false, message: 'internal server error' });
            return;
        }
    });

    app.get('/api/accounts', async (req, res) => {
        try {
            const allaccounts = await db_accounts.query('select * from accounts');
            res.json(allaccounts.rows);
            res.status
        } catch (error) {
            console.error('error fetching: ' + error);
            res.status(500).json({ success: false, message: 'internal server error' });
            return;
        }
    });

    app.post('/api/login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ success: false, message: 'please provide all fields' });
            return;
        }

        try {
            const bcryptpassword = await bcrypt.hash(password, 10);

            const account = await db_accounts.query('select * from accounts where email = $1 and password = $2', [email, bcryptpassword]);
            if (account.rows.length === 0) {
                res.status(400).json({ success: false, message: 'invalid credentials' });
                return;
            }

            const TokenAuth = jwt.sign(email, secret, { expiresIn: '1h' });

            res.status(200).json({ message: "login success!", TokenAuth });
        } catch (error) {
            console.error('error fetching: ' + error);
            res.status(500).json({ success: false, message: 'internal server error' });
            return;
        }
    });
}
