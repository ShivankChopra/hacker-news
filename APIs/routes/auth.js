const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../resources/user');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

// for registering new user, and creating tokens
router.post('/users/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const newUser = {
        name: req.body.name,
        password: hashedPassword,
        upvotedPosts: []
    };

    User.create(newUser).then((user, error) => {
        if (error || !user)
            return res.send({
                success: false,
                status: 500,
                message: 'Unable to create user. ' + error
            });

        //let token = jwt.sign({name: user.name}, config.secret, {expiresIn: 86400});
        res.status(200).json({
            success: true,
            status: 200,
            message: 'User created. Login to continue.'
            //token: token,
            //expiresIn: 86400
        });
    });
});

// logging in the user by verifying password and issuing token
router.post('/users/login', (req, res) => {
    User.find({ name: req.body.name }).then((user, error) => {
        if (error || !user)
            return res.send({
                success: false,
                status: 500,
                message: 'Unable to login user. ' + error
            });

        // compare passwords
        const passwordCorrect = bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect)
            return res.json({
                success: false,
                status: 401,
                message: 'Incorrrect password'
            });

        // issue token if password was correct
        const token = jwt.sign({ name: user.name }, config.secret, { expiresIn: 86400 });
        res.status(200).json({
            success: true,
            status: 200,
            token: token,
            expiresIn: 86400
        });
    });
});

// obtaining user based on jwt tokens
router.get('/users/get', (req, res) => {
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
            res.status(500).send("Name with this token not found");

        // find user based on decoded name and return
        User.find({ name: decoded.name }).then((user, error) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Error finding user' });
            }
            if (!user) {
                return res.status(404).json({ success: false, message: 'User was not found' });
            }

            res.json({
                success: true,
                status: 200,
                data: user
            });
        });
    });
});

module.exports = router;