const User = require('../models/User');

exports.getAllUsers = async () => {
    const users = await User.find({}, '-password'); // Exclude password from response
    if (!users.length) return { status: 404, data: { message: "No users found" } };
    return { status: 200, data: users };
};
