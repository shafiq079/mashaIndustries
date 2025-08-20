const AddressModel = require("../../models/addressModel");

async function updateAddress(req, res) {
    try {
        const sessionUserId = req.userId;
        const { addressId, ...updateData } = req.body;

        if (!addressId) {
            throw new Error("Address ID is required.");
        }

        const updatedAddress = await AddressModel.findOneAndUpdate({ _id: addressId, userId: sessionUserId }, updateData, { new: true });

        if (!updatedAddress) {
            throw new Error("Address not found or you do not have permission to update it.");
        }

        res.json({
            data: updatedAddress,
            message: "Address Updated Successfully",
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

module.exports = updateAddress;
