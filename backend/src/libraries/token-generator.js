const jwt = require('jsonwebtoken');

const secret = 'MyCl@veSecreta01';

const tokenGenerator = (username) => {
    
    const token = jwt.sign({
        username: username
    }, secret);
    
    console.log('token: ' + token);

    return token;
}

const decodeToken = (token) => {
    const tokenDecoded = jwt.verify(token, secret);
    return tokenDecoded;
}

module.exports = { tokenGenerator, decodeToken }