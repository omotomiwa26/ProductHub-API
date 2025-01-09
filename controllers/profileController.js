const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User Not Found' });

    const oldUsername = user.username;

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: `User '${oldUsername}' Profile Updated Successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User Not Found' });

    res.json({ message: `User '${user.username}' Profile Deleted Successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
