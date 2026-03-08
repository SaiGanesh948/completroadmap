const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve user (teacher)
// @route   PUT /api/users/:id/approve
// @access  Private/Admin
const approveUser = async (req, res) => {
    try {
        console.log(`Attempting to approve user ${req.params.id}`);
        const user = await User.findById(req.params.id);

        if (user) {
            user.isApproved = true;
            console.log('User found, setting isApproved=true');
            const updatedUser = await user.save();
            console.log('User saved:', updatedUser);
            res.json({ message: 'User approved' });
        } else {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Approve User Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, deleteUser, approveUser };
