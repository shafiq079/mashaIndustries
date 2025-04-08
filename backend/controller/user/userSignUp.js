require('dotenv').config();  // Make sure this is at the top of your file

const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../../helpers/verification');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            throw new Error("User already Exists.");
        }

        // Validate input fields
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!name) {
            throw new Error("Please provide name");
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password");
        }

        // Generate a verification token
        const verificationToken = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

        // Prepare the user data (isVerified is false initially)
        const payload = {
            name,
            email,
            role: "GENERAL",
            password: hashPassword,
            isVerified: false, // Set initial verification status to false
            verificationToken
        };

        // Create a new user
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Send verification email with token
        await sendVerificationEmail(saveUser.email, verificationToken);

        // Respond with success
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully! Please check your email for verification."
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
