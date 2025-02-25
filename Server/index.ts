import express from 'express';
import accounts from './api/accounts';

const app = express();

accounts();

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('server is running on port ' + process.env.EXPRESS_PORT);
})
