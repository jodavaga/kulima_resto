const data = require('../assets/data.json');

const existingData = (req, res, next) => {
    const {id, name} = req.body;

    const existingPlate = data.find(elem => {
        if (elem.id === Number(id) || elem.name === name) {
            return elem;
        }
    });
    
    if (!existingPlate) {
        return next();
    }

    return res.status(400).json({error: `You can't add exisiting plate`})
}

module.exports = {existingData};