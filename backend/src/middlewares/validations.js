const data = require('../assets/data.json');

const existingPlate = (req, res, next) => {
    const {id, name} = req.body;

    const existingPlate = data.find(elem => {
        if (elem.id === Number(id) || elem.name === name) {
            return elem;
        }
    });
    
    if (!existingPlate) {
        return next();
    }

    return res.status(400).json({error: `Can't add exisiting plate`})
}

const validateBodyPayload = (req, res, next) => {
    const {id, name, ingredients} = req.body;

    if (id && name && ingredients.length) {
        next();
    }

    return res.status(406).json({error: 'Please include all required fields.'})
}

module.exports = {existingPlate, validateBodyPayload};