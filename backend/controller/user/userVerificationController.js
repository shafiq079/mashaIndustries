const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel'); // Adjust path as necessary
require('dotenv').config();

const verifyEmailController = async (req, res) => {
    try {
        const token  = req.query.token;
        console.log("userVerification token", token)
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Verification token is missing',
            });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        // Find the user by decoded email
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified',
            });
        }

        // Mark user as verified
        user.isVerified = true;
        user.verificationToken = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully!',
        });
    } catch (err) {
        console.error('Error during email verification:', err);
        return res.status(500).json({
            success: false,
            message: 'Error verifying email, please try again',
        });
    }
};

module.exports =  verifyEmailController 
