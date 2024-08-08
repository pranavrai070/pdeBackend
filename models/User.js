const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  specialty: { type: String }, // For doctors
  mobileNumber: {
    type: String,
    validate: [
      {
        validator: function(v) {
          if (this.role === 'doctor' && !v) {
            return false;
          }
          return true;
        },
        message: 'Mobile number is required for doctors.'
      },
      {
        validator: function(v) {
          if (v && !validator.isMobilePhone(v, 'any')) {
            return false;
          }
          return true;
        },
        message: props => `${props.value} is not a valid mobile number!`
      }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
