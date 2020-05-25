const data = require('../assets/data.json');
const users = require('../assets/users.json');

const jwt = require('jsonwebtoken');

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

    // Validations for PUT method.
    if (req.method === 'PUT' && name && ingredients.length) {
        next();
    }

    if (id && name && ingredients.length) {
        next();
    }

    return res.status(406).json({error: 'Please include all required fields.'})
}

// USERS validations, Authentication

const validateUserPass = (req, res, next) => {
    const {username, email, password} = req.body;
    
    const [userExist] = users.filter(user => {
        if ((user.username === username || user.email === email) && user.password === password){
            return user;
        }
    });

    if (!userExist) {
        return res.status(409).json({error: 'Please verify username or password'})
    }

    next();
}

// Token validation

const verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, 'MyCl@veSecreta01');
        if (verifyToken) {
            req.username = verifyToken.username;
            return next();
        }
    } catch (e) {
        res.status(409).json({error: 'Session expired or user not found'})
    }
}

module.exports = {
    existingPlate,
    validateBodyPayload,
    validateUserPass,
    verifyToken
};