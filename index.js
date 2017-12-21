const express = require('express')
const app = express()

const email = require('./routes/email');

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/email', email);
app.listen(3000, () => console.log('Example app listening on port 3000!'))