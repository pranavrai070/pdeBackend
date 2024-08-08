const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    console.log("getting signup data",req.body);
    const { name, email, password, age, gender, role, specialty,mobileNumber } = req.body;

    // Check if the mobile number is required for the doctor role
    if (role === 'doctor' && !mobileNumber) {
      return res.status(400).json({ success: false, error: 'Mobile number is required for doctors.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, age, gender, role, specialty,mobileNumber });
    await newUser.save();
    const token = authService.generateToken(newUser._id);
    res.status(201).json({ success: true, token, role: newUser.role });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = authService.generateToken(user._id);
    res.status(200).json({ success: true, token, role: user.role });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const changePassword = async (req, res) => {
  try {
    // const { userId } = req.user; 
    const { userId,newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports ={
    signup,
    login,
    changePassword
}
