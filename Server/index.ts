import express from 'express';
import cors from 'cors';
import pool from './db';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/accounts', async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        res.json({ success: false, message: 'Please provide all fields' });
        return;
    }

    try {
        const newAccount = await pool.query(
            'INSERT INTO accounts (email, username, password) VALUES($1, $2, $3) RETURNING *',
            [email, username, password]
        );
        res.json(newAccount.rows[0]);
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
    } catch (error) {
        console.error('Error fetching: ' + error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Server is running on port ' + process.env.EXPRESS_PORT);
});
