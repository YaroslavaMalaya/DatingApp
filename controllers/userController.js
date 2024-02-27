const User = require("../models/user");

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get one user by ID
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Post (create) a new user
exports.postUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a user by ID (put)
// Update a part of user by ID (patch)
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `User by id: ${id} was deleted successfully` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
