const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

// Register a new user
const registerUser = async (username, email, password, role) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const user = new User({ username, email, password, role });
    await user.save();

    return generateToken(user);
};

// Login user
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid email or password');
    }

    return generateToken(user);
};

module.exports = { registerUser, loginUser };
