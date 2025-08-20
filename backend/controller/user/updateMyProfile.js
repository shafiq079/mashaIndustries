const userModel = require("../../models/userModel");

async function updateMyProfile(req, res) {
    try {
        const sessionUserId = req.userId;
        const { name, profilePic } = req.body;

        const payload = {};
        if (name) {
            payload.name = name;
        }
        if (profilePic) {
            payload.profilePic = profilePic;
        }

        const updatedUser = await userModel.findByIdAndUpdate(sessionUserId, payload, { new: true });

        res.json({
            data: updatedUser,
            message: "Profile Updated Successfully",
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

module.exports = updateMyProfile;
