const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function changePassword(req, res) {
    try {
        const sessionUserId = req.userId;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            throw new Error("Old password and new password are required.");
        }

        const user = await userModel.findById(sessionUserId);
        if (!user) {
            throw new Error("User not found.");
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Incorrect old password.");
        }

        const salt = bcrypt.genSaltSync(10);
        const newHashedPassword = await bcrypt.hashSync(newPassword, salt);

        user.password = newHashedPassword;
        await user.save();

        res.json({
            message: "Password changed successfully.",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = changePassword;
