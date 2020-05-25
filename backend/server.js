const express = require('express');
const bodyParser = require('body-parser');
const data = require('./src/assets/data.json');

// Middlewares
const validations = require('./src/middlewares/validations');

const app = express();

app.use(bodyParser.json());

// initialize data (plates)
const plates = data;

/* ==================================================================
*   Plates
* ======================== */

// GET
app.get('/plates', (req, res) => {
    res.json(plates);
});

// GET by id
app.get('/plates/:id', (req, res) => {
    const {id} = req.params;

    const index = plates.findIndex((elem) => {
        if (elem.id === Number(id)) {
            return elem;
        }
    });

    if (index === -1) {
        return res.status(404).json({error: `No plate found with id: ${id}.`})
    }

    return res.json(plates[index]);

});

// POST - new plates
app.post('/plates', validations.existingPlate, validations.validateBodyPayload, (req, res) => {
    
    plates.push(req.body);
    res.json(req.body);
});

// PUT
app.put('/plates/:id', validations.validateBodyPayload, (req, res) => {
    const { id } = req.params;
    const {name, price, ingredients, difficult, description  } = req.body;

    const plate = plates.find((elem, index) => {
        if (elem.id === Number(id)) {

            elem.name = name;
            elem.price = price;
            elem.ingredients = ingredients;
            elem.difficult = difficult;
            elem.description = description;

            return plates[index];
        }
    });

    if (!plate) {
        return res.status(404).json({error: `No plate Found, id: ${id}.`})
    }

    return res.json(plate);
    
});

// DELETE
app.delete('/plates/:id', (req, res) => {
    const {id} = req.params;

    const index = plates.findIndex((elem) => {
        if (elem.id === Number(id)) {
            return elem;
        }
    });
    console.log('index', index);

    if (index === -1) {
        return res.status(404).json({error: `Can't delete plate, id: ${id}. NOT FOUND!`})
    }

    plates.splice(index, 1);
    return res.json({status: 'Deleted'});

});

app.listen(4000, () => {
    console.log('Server initialized on: 4000');
})