const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const https = require('https')
const fs = require('fs')
require('./database');
require('./schedule')

app.use(bodyParser.json());
app.use(cors());

// API
const league = require('./api/stats/league');
app.use('/api/stats/league/', league);

const team = require('./api/stats/team');
app.use('/api/stats/', team)

const email = require('./api/email');
app.use('/api/email', email);

app.use(express.static(path.join(__dirname, '../build')))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
