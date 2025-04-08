const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePic: String,
    role: { type: String, default: "GENERAL" },
    isVerified: { type: Boolean, default: false },  // New field for verification
    verificationToken: { type: String }, // New field for storing verification token
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
