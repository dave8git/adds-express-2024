const User = require('../models/users.model');
const Session = require('../models/sessions.model');
const bcrypt = require('bcryptjs');
const upload = require('../config/multerConfig');

exports.logout = async (req, res) => {
    try {
        if (req.session) {
            req.session.destroy(async (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Logout failed' });
                }
                // For non-production environments, clear all sessions
                if (process.env.NODE_ENV !== 'production') {
                    await Session.deleteMany({});
                }
                res.status(200).send({ message: 'Logout successful' });
            });
        } else {
            res.status(400).send({ message: 'No active session' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.register = async (req, res) => {

    upload.single('avatar')(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        const { login, password, phone } = req.body;

        // Server-side validation (basic example)
        if (!login || !password) {
            return res.status(400).send({ message: 'Login and password are required' });
        }
        if (password.length < 8) {
            return res.status(400).send({ message: 'Password must be at least 8 characters long' });
        }

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                login,
                password: hashedPassword,
                avatar: req.file ? req.file.filename : null,
                phone
            });
            await newUser.save();
            res.status(201).send({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).send({ message: 'Server error' });
        }
    });
};

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });
            if (!user) {
                res.status(400).send('Login or password are incorrect');
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.login = user.login;
                    req.session.userId = user._id.toString();
                    // console.log('user', user);
                    // console.log('userid.toString()', user._id.toString());
                    res.status(200).send({ message: 'Login successful ' });
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect' });
                }
            }

        } else {
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getUser = async (req, res) => {
    // if (req.session.login) {
    //     res.send({ login: req.session.login });
    // } 
    // else {
    //     res.status(401).send({ message: 'Unauthoried' });
    // }
    console.log('getUser req.session', req.session);
    res.send(req.session.user);
}