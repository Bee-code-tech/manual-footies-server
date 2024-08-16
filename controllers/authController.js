// controllers/authController.js
const User = require('../models/Users');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { log } = require('console');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Register User
exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;
      // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: 'Invalid email address' });
    }

    try { 
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ email, username, password });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpires = Date.now() + 3600000; // OTP valid for 1 hour

        await user.save();

       
        // Send OTP via email with HTML styling
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: 'OTP for Account Verification',
            html: `
                <h2>Welcome to Our E-Commerce Platform!</h2>
                <p>Dear ${username},</p>
                <p>Thank you for registering on our platform. Please use the following OTP to verify your email address:</p>
                <h3 style="color: #3498db;">${otp}</h3>
                <p>This OTP is valid for 1 hour. Please do not share this code with anyone.</p>
                <p>Best regards,<br/>E-Commerce Team</p>
            `,
        };

        await transporter.sendMail(mailOptions);


        res.status(201).json({ msg: 'OTP sent to your email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: 'User not found' });
        if (user.isVerified) return res.status(400).json({ msg: 'User already verified' });

        // Check OTP and expiry
        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ msg: 'Account verified successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user || !user.isVerified) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Check if Email Exists
exports.checkEmailExists = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({ exists: true, msg: 'Email already exists' });
        } else {
            return res.status(200).json({ exists: false, msg: 'Email is available' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
