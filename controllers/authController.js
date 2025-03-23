const { registerUser, loginUser } = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const token = await registerUser(username, email, password, role);
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
