const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const email = require('./routes/email');

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/email', email);
app.listen( process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))