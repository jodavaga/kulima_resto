const express = require('express');
const bodyParser = require('body-parser');
const data = require('./src/assets/data.json');

// Middlewares
const existingPlate = require('./src/middlewares/existing-plate');

const app = express();

app.use(bodyParser.json());

// initialize data (plates)
const plates = data;

// GET
app.get('/plates', (req, res) => {
    res.json(plates);
});

// POST
app.post('/plates', existingPlate.existingData, (req, res) => {
    
    plates.push(req.body);
    res.json(req.body);
});

app.listen(4000, () => {
    console.log('Server initialized on: 4000');
})