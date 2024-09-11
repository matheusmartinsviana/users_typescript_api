import express from 'express';
import { config } from 'dotenv';

const app = express();

const port = process.env.PORT || 8000;

app.get('/',(req,res) => {
    res.send('hello world')
})

app.listen(port, () => console.log(`Server running on port ${port}`))