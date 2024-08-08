const User = require('../models/User');
const bcrypt = require('bcrypt');

const getDocotor = async (req, res) => {
  try {
    const { userId} = req.body;
    console.log("getting userid to get docotr",userId);
    const doctor = await User.findById(userId);
    return res.status(200).json({doctor});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const updateUserData = async (req, res) => {
  try {
    const { name, email, password, age, gender, role, specialty, mobileNumber,userId } = req.body;
    // const userId = req.params.id; // Assuming you pass the user ID in the URL params for the update

    // Check if the mobile number is required for the doctor role
    if (role === 'doctor' && !mobileNumber) {
      return res.status(400).json({ success: false, error: 'Mobile number is required for doctors.' });
    }

    // Prepare the update object based on provided fields (ignoring undefined fields)
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }
    if (age) updateFields.age = age;
    if (gender) updateFields.gender = gender;
    if (role) updateFields.role = role;
    if (specialty) updateFields.specialty = specialty;
    if (mobileNumber) updateFields.mobileNumber = mobileNumber;

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports={getDocotor,updateUserData}