const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: 404,
        error: "No User Found",
      });
    }

    res.status(200).json({
      status: "Success",
      statusCode: 200,
      message: "User's Profile Retrieved Successfully",
      user: {
          Username: user.username,
          Email: user.email,
        },
      });
  } catch (error) {
    console.error("Error Retrieving User's Profile: ", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        message: `Failed To Retrieve User's Profile: ${error.message}`,
      });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "Bad Request",
      statusCode: 400,
      error: "Please Input All Required Fields",
    });
  }

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: 404, 
        message: 'User Not Found', 
      });
    }

    user.username = username || user.username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      status: "Success",
      statusCode: 200, 
      message: `User Profile Updated Successfully` 
    });
  } catch (error) {
    console.error("Error Updating User's Profile: ", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        message: `Failed To Update User's Profile: ${error.message}`,
      });
  }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: 404, 
        message: 'User Not Found', 
      });
    }

    res.json({ 
      status: "Success",
      statusCode: 200, 
      message: `User's Profile Deleted Successfully` 
    });
  } catch (error) {
    console.error("Error Deleting User's Profile: ", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        error: `Failed To Delete User's Profile: ${error.message}` ,
      });
  }
};
