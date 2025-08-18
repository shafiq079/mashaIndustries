const customOrderModel = require('../../models/customsch');

const getCustomOrders = async (req, res) => {
    try {
        const allOrders = await customOrderModel.find().sort({ createdAt: -1 }); // Sort by newest first
        res.json({
            message: "All Custom Orders",
            data: allOrders,
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
