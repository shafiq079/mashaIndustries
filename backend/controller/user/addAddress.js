const AddressModel = require("../../models/addressModel");

async function addAddress(req, res) {
    try {
        const sessionUserId = req.userId;
        const { fullName, streetAddress, city, state, postalCode, country, phoneNumber } = req.body;

        const newAddress = new AddressModel({
            userId: sessionUserId,
            fullName,
            streetAddress,
            city,
            state,
            postalCode,
            country,
            phoneNumber
        });

        const savedAddress = await newAddress.save();

        res.status(201).json({
            data: savedAddress,
            message: "Address Added Successfully",
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

module.exports = addAddress;
