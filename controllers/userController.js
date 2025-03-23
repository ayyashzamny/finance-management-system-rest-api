const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
