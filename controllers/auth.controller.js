const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { login, password, avatar, phone } = req.body;

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
        const newUser = new User({ login, password: hashedPassword, avatar, phone });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};
  
exports.login = async (req, res) => {
    try {
        const { login, password } = req.body; 
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login });
            if(!user) {
                res.status(400).send('Login or password are incorrect');
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.login = user.login; 
                    res.status(200).send({ message: 'Login successful '});
                } 
                else {
                    res.status(400).send({ message: 'Login or password are incorrect'});
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
    res.send('Logged in successfully!');
}