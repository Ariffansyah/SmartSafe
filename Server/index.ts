import express from 'express';
import cors from 'cors';
import pool from './db';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        res.status(400).json({ success: false, message: 'Please provide all fields' });
        return;
    }

    try {
        const checkEmail = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
        if (checkEmail.rows.length > 0) {
            res.status(400).json({ success: false, message: 'Email already exists' });
            return;
        }

        const checkUsername = await pool.query('SELECT * FROM accounts WHERE username = $1', [username]);
        if (checkUsername.rows.length > 0) {
            res.status(400).json({ success: false, message: 'Username already exists' });
            return;
        }

        const bycrptPassword = await bcrypt.hash(password, 10);

        const newAccount = await pool.query(
            'INSERT INTO accounts (email, username, password) VALUES($1, $2, $3) RETURNING *',
            [email, username, bycrptPassword]
        );
        res.status(201).json({ success: true, message: 'Account created successfully', data: newAccount.rows[0] });
    } catch (error) {
        console.error('Error inserting: ' + error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});

app.get('/api/accounts', async (req, res) => {
    try {
        const allAccounts = await pool.query('SELECT * FROM accounts');
        res.json(allAccounts.rows);
        res.status
    } catch (error) {
        console.error('Error fetching: ' + error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Please provide all fields' });
        return;
    }

    try {
        const bcryptPassword = await bcrypt.hash(password, 10);

        const account = await pool.query('SELECT * FROM accounts WHERE email = $1 AND password = $2', [email, bcryptPassword]);
        if (account.rows.length === 0) {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
            return;
        }
        res.json(account.rows[0]);
    } catch (error) {
        console.error('Error fetching: ' + error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Server is running on port ' + process.env.EXPRESS_PORT);
});
