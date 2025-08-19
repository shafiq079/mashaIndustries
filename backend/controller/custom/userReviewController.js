const CustomOrderRequestModel = require('../../models/CustomOrderRequest');

const userReviewController = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const currentUserId = req.userId;

        if (!orderId || !status) {
            throw new Error("Order ID and status are required.");
        }

        if (!['approved', 'rejected'].includes(status)) {
            throw new Error("Invalid status provided.");
        }

        const order = await CustomOrderRequestModel.findOne({ _id: orderId, userId: currentUserId });

        if (!order) {
            throw new Error("Order not found or you do not have permission to modify it.");
        }

        if (order.status !== 'quoted') {
            throw new Error("This order is not awaiting your approval.");
        }

        order.status = status;
        const updatedOrder = await order.save();

        res.json({
            message: `Quote ${status} successfully.`,
            data: updatedOrder,
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

module.exports = userReviewController;
