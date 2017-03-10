'use strict';

const jsonwebtoken = require('jsonwebtoken');

const jwt = jsonwebtoken.sign({
    scope: 'app'
}, process.env.SMOOCH_SECRET, {
    headers: {
        kid: process.env.SMOOCH_KEY_ID
    }
});

console.log(jwt);
module.exports = jwt;

// If run directly, print JWT to cmd line
if (process.argv[1] === __filename) {
    console.log(jwt);
}
