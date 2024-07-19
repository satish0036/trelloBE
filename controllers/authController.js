import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const jwtSecret = 'your_jwt_secret'; // Store this in an environment variable in a real application

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(name, email, hashedPassword, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error registering user', error: err });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    User.findByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging in', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    });
};
