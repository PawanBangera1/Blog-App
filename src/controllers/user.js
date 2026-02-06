const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
}

async function handleGetUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error while fetching user' });
    }   
}

async function handleCreateUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Server error while creating user' });
    }
}

async function handleUpdateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body; 
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password;
        }
        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server error while updating user' });
    }
}

async function handleDeleteUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error while deleting user' });
    }   
}

async function handleUpdatePassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = password;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'Server error while updating password' });
    }
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleUpdatePassword
};
