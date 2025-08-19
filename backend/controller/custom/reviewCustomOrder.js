const CustomOrderRequestModel = require('../../models/CustomOrderRequest');

const reviewCustomOrder = async (req, res) => {
    try {
        const { orderId, adminPrice } = req.body;

        if (!orderId) {
            throw new Error("Order ID is required.");
        }

        if (!adminPrice || adminPrice <= 0) {
            throw new Error("A valid price is required to submit a quote.");
        }

        const updateData = {
            status: 'quoted',
            adminPrice: adminPrice
        };

        const updatedOrder = await CustomOrderRequestModel.findByIdAndUpdate(orderId, updateData, { new: true });

        if (!updatedOrder) {
            throw new Error("Order not found.");
        }

        res.json({
            message: `Price quote submitted successfully.`,
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

module.exports = reviewCustomOrder;
