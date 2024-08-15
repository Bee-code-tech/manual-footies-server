// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
         required: true,
          unique: true
     },
    username: { 
        type: String,
         required: true,
          unique: true
     },
    password: 
    { type: String, 
        required: true
     },
    role: 
    { 
        type: String,
         enum: ['user', 'admin'], 
         default: 'user' 
        },

    isVerified: { 
        type: Boolean,
         default: false 
        },
    otp: { 
        type: Number
     },
     profilePicture: { 
        type: String 
    }, 
    otpExpires: { 
        type: Date
     },
}, { timestamps: true });

// Hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
