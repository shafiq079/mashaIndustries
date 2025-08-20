const AddressModel = require("../../models/addressModel");

async function deleteAddress(req, res) {
    try {
        const sessionUserId = req.userId;
        const { addressId } = req.body;

        if (!addressId) {
            throw new Error("Address ID is required.");
        }

        const deletedAddress = await AddressModel.findOneAndDelete({ _id: addressId, userId: sessionUserId });

        if (!deletedAddress) {
            throw new Error("Address not found or you do not have permission to delete it.");
        }

        res.json({
            message: "Address Deleted Successfully",
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

module.exports = deleteAddress;
