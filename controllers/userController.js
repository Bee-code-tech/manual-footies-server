// controllers/userController.js
const User = require('../models/Users');
const debug = require('debug')('app:userController');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        debug('Error fetching user profile:', err.message);
        res.status(500).send('Server Error');
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { username, profilePicture } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.username = username || user.username;
        user.profilePicture = profilePicture || user.profilePicture;

        await user.save();
        debug('User profile updated successfully');
        res.status(200).json(user);
    } catch (err) {
        debug('Error updating user profile:', err.message);
        res.status(500).send('Server Error');
    }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        debug('User account deleted successfully');
        res.status(200).json({ msg: 'User account deleted successfully' });
    } catch (err) {
        debug('Error deleting user account:', err.message);
        res.status(500).send('Server Error');
    }
};
