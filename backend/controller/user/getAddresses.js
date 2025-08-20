const AddressModel = require("../../models/addressModel");

async function getAddresses(req, res) {
    try {
        const sessionUserId = req.userId;

        const addresses = await AddressModel.find({ userId: sessionUserId });

        res.json({
            data: addresses,
            message: "Addresses retrieved successfully",
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

module.exports = getAddresses;
