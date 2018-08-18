const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../resources/user');
const config = require('../config');

// verify token, then send the name of user for access
function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.json({ // if no token sent
            success: false,
            status: 401,
            message: 'No access token specified'
        });

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error)
            console.log(error);
        if (!decoded)
            return res.status(500).send("Name with this token not found");

        // find user based on decoded name and return
        User.find({ name: decoded.name }).then((user, error) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Error finding user' });
            }
            if (!user) {
                return res.status(404).json({ success: false, message: 'User was not found' });
            }

            req.userExists = true; // user authenticated
            next();
        });
    });
}

module.exports = verifyToken;