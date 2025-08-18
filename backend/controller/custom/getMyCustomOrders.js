const CustomOrderRequestModel = require('../../models/CustomOrderRequest');

const getMyCustomOrders = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const userOrders = await CustomOrderRequestModel.find({ userId: currentUserId }).sort({ createdAt: -1 });

        res.json({
            message: "User's Custom Orders",
            data: userOrders,
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
};

module.exports = getMyCustomOrders;
