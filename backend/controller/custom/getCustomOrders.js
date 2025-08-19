const CustomOrderRequestModel = require('../../models/CustomOrderRequest');
const userModel = require('../../models/userModel');

const getCustomOrders = async (req, res) => {
    try {
        const allOrders = await CustomOrderRequestModel.find().sort({ createdAt: -1 });

        // Manually populate user details
        const ordersWithUserDetails = await Promise.all(allOrders.map(async (order) => {
            const user = await userModel.findById(order.userId);
            return {
                ...order.toObject(),
                userId: user ? { _id: user._id, email: user.email, name: user.name } : { email: 'User not found' }
            };
        }));

        res.json({
            message: "All Custom Orders",
            data: ordersWithUserDetails,
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

module.exports = getCustomOrders;
