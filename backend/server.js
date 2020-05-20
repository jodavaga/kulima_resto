const express = require('express');
const bodyParser = require('body-parser');
const data = require('./src/assets/data.json');

const app = express();

app.use(bodyParser.json());

// initialize data (plates)
const plates = data;


// GET
app.get('/plates', (req, res) => {
    res.json(plates);
});

app.listen(4000, () => {
    console.log('Server initialized on: 4000');
})