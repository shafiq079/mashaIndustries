const customOrderModel = require('../../models/customsch');

const reviewCustomOrder = async (req, res) => {
    try {
        const { orderId, status, adminPrice } = req.body;

        if (!orderId || !status) {
            throw new Error("Order ID and status are required.");
        }

        if (status === 'approved' && (!adminPrice || adminPrice <= 0)) {
            throw new Error("A valid price is required to approve an order.");
        }

        const updateData = {
            status: status,
            adminPrice: status === 'approved' ? adminPrice : undefined
        };

        const updatedOrder = await customOrderModel.findByIdAndUpdate(orderId, updateData, { new: true });

        if (!updatedOrder) {
            throw new Error("Order not found.");
        }

        res.json({
            message: `Order ${status} successfully.`,
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
